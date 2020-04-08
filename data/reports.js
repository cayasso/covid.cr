import { fetch as fetchJson, fetchText } from '../lib/fetch'

const normalize = (data) => ({
  date: data.date,
  confirmed: data.confirmedCases,
  discarded: data.discardedCases,
  active: data.byStatus.active,
  recovered: data.byStatus.recovered,
  deceased: data.byStatus.deceased,
  cases: data.byStatus.active + data.byStatus.recovered + data.byStatus.deceased,

  age: {
    adults: data.byAge.adults,
    juveniles: data.byAge.juveniles,
    elderlies: data.byAge.elderlies,
  },

  gender: {
    F: data.byGender.women,
    M: data.byGender.men,
  },

  nationality: {
    costarricans: data.byNationality.costarricans,
    foreigners: data.byNationality.foreigners,
  },

  province: {
    1: data.byLocation.sanJose,
    2: data.byLocation.alajuela,
    3: data.byLocation.cartago,
    4: data.byLocation.heredia,
    5: data.byLocation.guanacaste,
    6: data.byLocation.puntarenas,
    7: data.byLocation.limon,
    8: data.byLocation.unknown,
  },
})

export const remoteFetchGlobal = async () => {
  const response = await fetchJson(`https://thevirustracker.com/free-api?global=stats`)
  const [data] = response.results

  return {
    code: 'ALL',
    total: data.total_cases,
    recovered: data.total_recovered,
    deceased: data.total_deaths,
    active: data.total_active_cases,
  }
}

export const remoteFetchAllCountries = async () => {
  try {
    const response = await fetchJson(`https://www.trackcorona.live/api/countries/`)

    return response.data.map((data) => {
      return {
        code: data.country_code.toUpperCase(),
        name: data.location,
        total: data.confirmed,
        recovered: data.recovered,
        deceased: data.dead,
        active: data.confirmed - data.recovered - data.dead,
      }
    })
  } catch (error) {
    console.log(error)
    const response = await fetchJson(`https://api.thevirustracker.com/free-api?countryTotals=ALL`)

    return Object.keys(response.countryitems[0]).map((key) => {
      const data = response.countryitems[0][key]

      return {
        code: data.code,
        name: data.title,
        total: data.total_cases,
        recovered: data.total_recovered,
        deceased: data.total_deaths,
        active: data.total_active_cases,
      }
    })
  }
}

export const remoteFetchByCountry = async (code = 'ALL') => {
  if (code === 'ALL') return remoteFetchAllCountries()

  try {
    const response = await remoteFetchAllCountries()
    return response.find((item) => item.code === code)
  } catch (error) {
    console.log(error)

    const response = await fetchJson(`https://thevirustracker.com/free-api?countryTotal=${code}`)
    const [data] = response.countrydata

    return {
      code: data.info.code,
      total: data.total_cases,
      recovered: data.total_recovered,
      deceased: data.total_deaths,
      active: data.total_active_cases,
    }
  }
}

export const remoteFetchHistory = async () => {
  const { data } = await fetchJson('https://coronaviruscr.com/api/reports')
  return data.map(normalize)
}

export const remoteFetchByDate = async (date) => {
  const reports = await remoteFetchHistory()
  const report = reports.find((item) => item.date === date)
  if (report) report.canton = await remoteFetchByCantons(date)
  return report
}

export const remoteFetchByCantons = async (date) => {
  try {
    if (!date) return []
    date = date.replace(/-/g, '')
    const response = await fetchText(
      `http://geovision.uned.ac.cr/oges/js_covid/capas/covid19_${date}.js`
    )
    const text = response.replace(/^.*=/, '').trim()
    const rawData = JSON.parse(text)

    const data = rawData.features.reduce((acc, item) => {
      const { casos, cod_canton } = item.properties
      return { ...acc, [cod_canton]: casos }
    }, {})

    return data
  } catch (error) {
    console.log('ERROR', error)
  }
}
