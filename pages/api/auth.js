import config from '../../config'
import createPeople from '../../data/people'
import { λ, createError } from '../../lib/utils'

const signin = (request) => {
  const { signin } = createPeople(config)
  return signin(request.body)
}

export default λ((request, response) => {
  if (request.method === 'POST') {
    return signin(request, response)
  }

  throw createError('Not found', 404)
})
