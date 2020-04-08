import { isEmpty, isArray } from 'lodash'
import formatDate from 'date-fns/format'
import subDays from 'date-fns/subDays'
import { λ, createError, toBoolean, toDate } from '../../lib/utils'
import {
  remoteFetchByDate,
  remoteFetchByCantons,
  remoteFetchHistory,
  remoteFetchByCountry,
} from '../../data/reports'
import config from '../../config'
import createDb from '../../lib/db'

const db = createDb(config.mongo)

const fetchSummary = async (date) => {
  const reports = await db.get('reports')
  const pipeline = []

  if (date) {
    pipeline.push({ $match: { date } })
  }

  pipeline.push({
    $project: {
      _id: 0,
      date: 1,
      code: 'CR',
      active: '$active',
      recovered: '$recovered',
      deceased: '$deceased',
      total: { $sum: ['$active', '$recovered', '$deceased'] },
    },
  })

  pipeline.push({ $sort: { date: -1 } })
  const data = await reports.aggregate(pipeline)

  return date ? data[0] : data
}

const updateCantons = async (date, data = {}) => {
  const reports = await db.get('reports')
  const canton = await remoteFetchByCantons(date)
  return reports.updateOne({ date }, { ...data, canton }, { upsert: true })
}

const normalize = (data) => {
  data.total = data.active + data.recovered + data.deceased
  return data
}

const fetch = async ({ query }, response) => {
  const isRecursive = !response
  const reports = await db.get('reports')
  const inDate = query.date && isRecursive ? toDate(query.date) : null
  const compareDate = inDate || new Date()
  const today = formatDate(compareDate, 'yyyy-MM-dd')
  const yesterday = formatDate(subDays(compareDate, 1), 'yyyy-MM-dd')

  let { date = '', country, history, summary = 0, fallback = 1 } = query

  const isHistory = toBoolean(history)
  const isSummary = toBoolean(summary)
  const isFallback = toBoolean(fallback)

  if (country) {
    return remoteFetchByCountry(country.toUpperCase())
  }

  let report

  if (!date && !isHistory) {
    date = today
  }

  if (isSummary) {
    report = await fetchSummary(date)
  } else {
    if (!date) {
      const data = await reports.findMany({}, { projection: { _id: 0 }, sort: '-date' })
      let todayReport = data.find((r) => r.date === today)

      if (!todayReport) {
        todayReport = await remoteFetchByDate(today)

        if (todayReport) {
          await reports.updateOne({ date: today }, todayReport, { upsert: true })
          data.unshift(todayReport)
        }
      }

      return data.map(normalize)
    }

    report = await reports.findOne({ date })

    if (!report) {
      const data = await remoteFetchHistory()
      report = data.find((item) => item.date === date)
    }

    if (report && (!report.canton || isEmpty(report.canton))) {
      report = await updateCantons(date, report)
    }
  }

  if (!report) {
    if (!isHistory && isFallback) {
      return fetch({ query: { ...query, date: yesterday } })
    }

    throw createError('Not found', 404)
  }

  if (!isArray(report)) {
    delete report._id
  }

  return normalize(report)
}

export default λ((request, response) => {
  switch (request.method) {
    case 'GET':
      return fetch(request, response)
    default:
  }

  throw createError('Not found', 404)
})
