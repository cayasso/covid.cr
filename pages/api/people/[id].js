import config from '../../../config'
import createPeople from '../../../data/people'
import { createAuth } from '../../../lib/auth'
import { λ, createError } from '../../../lib/utils'

const auth = createAuth(config)
const people = createPeople(config)

const fetch = ({ user, query }) => {
  return people.fetch({ ...query, user })
}

const update = ({ user, query, body }) => {
  return people.update({ ...body, ...query, user })
}

export default λ(
  auth((req, res) => {
    switch (req.method) {
      case 'PATCH':
      case 'PUT':
        return update(req, res)
      case 'GET':
        return fetch(req, res)
      default:
    }

    throw createError('Not found', 404)
  })
)
