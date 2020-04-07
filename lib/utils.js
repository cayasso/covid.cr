import parsePhone from 'phone'
import parseDate from 'date-fns/parse'
import formatDateFn from 'date-fns/format'
import { es } from 'date-fns/locale'

export const createError = (message, code = 400) => {
  const error = new Error(message)
  error.statusCode = code
  return error
}

export const toPhone = (number, code = 'CR') => {
  if (!number) return null
  const parsed = parsePhone(String(number), code)
  if (parsed.length === 0) return null
  return parsed[0]
}

export const isPhone = (number, code, line) => {
  return Boolean(toPhone(number, code, line))
}

export const λ = (fn) => async (request, response) => {
  try {
    const data = await fn(request, response)
    response.statusCode = 200
    response.json(data)
  } catch (error) {
    if (error.statusCode === 401) return response.end(error.message)
    response.statusCode = error.statusCode || 500
    response.json({ error: true, status: response.statusCode, message: error.message })
    console.error(error.message)
    throw error
  }
}

export const round = (number) => {
  return Number(Math.round(number + 'e+1') + 'e-1')
}

export const formatDate = (date, pattern = 'dd MMM') => {
  return formatDateFn(toDate(date), pattern, { locale: es })
}

export const toDate = (date) => {
  return parseDate(date, 'yyyy-MM-dd', new Date())
}

export const sleep = (time) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}

export const toBoolean = (value) => {
  return !/^(false|0)$/i.test(value) && Boolean(value)
}

export const getHost = () => {
  const r = window.location.href.match(/^(https?:)?\/\/[^/]+/i)
  return r ? r[0] : ''
}

export const secondsToTime = (s) => {
  return [parseInt((s / 60) % 60, 10), parseInt(s % 60, 10)].join(':').replace(/\b(\d)\b/g, '0$1')
}
