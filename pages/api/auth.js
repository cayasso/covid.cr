import config from '../../config'
import createPeople from '../../data/people'
import { λ, createError } from '../../lib/utils'

const signin = req => {
  const { signin } = createPeople(config)
  return signin(req.body)
}

export default λ((req, res) => {
  if (req.method === 'POST') {
    return signin(req, res)
  }

  throw createError('Not found', 404)
})
