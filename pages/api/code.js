import config from '../../config'
import createMailer from '../../lib/mailer'
import createPeople from '../../data/people'
import { encode } from '../../lib/auth'
import { λ, createError } from '../../lib/utils'

const { fetchCode, createCode } = createPeople(config)
const { send: sendSms } = createMailer(config)

const fetch = async req => {
  return fetchCode(req.query)
}

const send = async req => {
  try {
    const { phone, code, lastCodeUpdate: updated } = await createCode(req.body)
    const { origin } = req.headers
    const res = await sendSms(
      phone,
      `CovidCR: Pin ${code} Link ${origin}/api/a/${encode(phone, code)}`
    )
    console.log(res)
    return { updated }
  } catch (error) {
    console.log(error)
    throw error
  }
}

export default λ((req, res) => {
  switch (req.method) {
    case 'GET':
      return fetch(req, res)
    case 'POST':
      return send(req, res)
    default:
  }

  throw createError('Not found', 404)
})
