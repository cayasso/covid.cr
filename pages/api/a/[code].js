import config from '../../../config'
import createPeople from '../../../data/people'
import * as tokens from '../../../lib/tokens'
import { decode } from '../../../lib/auth'

const { signin } = createPeople(config)

export default async (request, response) => {
  if (request.method !== 'GET') {
    return response.status(404).end('Not found')
  }

  try {
    const { code } = request.query
    const data = decode(code)
    const { token } = await signin(data || {})
    tokens.set(token, { req: request, res: response })
    response.writeHead(302, { Location: `/?mode=login` })
    response.end()
  } catch (_) {
    response.status(401).end('Unauthorized')
  }
}
