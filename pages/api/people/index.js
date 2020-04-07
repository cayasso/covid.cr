import config from '../../../config'
import createPeople from '../../../data/people'
import { createAuth } from '../../../lib/auth'
import { λ, createError } from '../../../lib/utils'

const auth = createAuth(config)
const people = createPeople(config)

const fetch = ({ user, query }) => {
  return people.fetch({ ...query, user })
}

const create = ({ user, body }) => {
  return people.create({ ...body, user })
}

export default λ(
  auth((req, res) => {
    switch (req.method) {
      case 'POST':
        return create(req, res)
      case 'GET':
        return fetch(req, res)
      default:
    }

    throw createError('Not found', 404)
  })
)
