import config from '../../config'
import createMailer from '../../lib/mailer'
import createPeople from '../../data/people'
import { encode } from '../../lib/auth'
import { λ, createError } from '../../lib/utils'

const { fetchCode, createCode } = createPeople(config)
const { send: sendSms } = createMailer(config)

const fetch = async (request) => {
  return fetchCode(request.query)
}

const send = async (request) => {
  try {
    const { phone, code, lastCodeUpdate: updated } = await createCode(request.body)
    const { origin } = request.headers
    const response = await sendSms(
      phone,
      `CovidCR: Pin ${code} Link ${origin}/api/a/${encode(phone, code)}`
    )
    console.log(response)
    return { updated }
  } catch (error) {
    console.log(error)
    throw error
  }
}

export default λ((request, response) => {
  switch (request.method) {
    case 'GET':
      return fetch(request, response)
    case 'POST':
      return send(request, response)
    default:
  }

  throw createError('Not found', 404)
})
