import config from '../../../config'
import createPeople from '../../../data/people'
import * as tokens from '../../../lib/tokens'
import { decode } from '../../../lib/auth'

const { signin } = createPeople(config)

export default async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(404).end('Not found')
  }

  try {
    const { code } = req.query
    const data = decode(code)
    const { token } = await signin(data || {})
    tokens.set(token, { req, res })
    res.writeHead(302, { Location: `/?mode=login` })
    res.end()
  } catch (_) {
    res.status(401).end('Unauthorized')
  }
}
