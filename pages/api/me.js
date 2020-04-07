import config from '../../config'
import createPeople from '../../data/people'
import { createAuth } from '../../lib/auth'
import { λ, createError } from '../../lib/utils'

const auth = createAuth(config)
const people = createPeople(config)

const fetch = ({ user }) => {
  return people.fetch({ id: user._id })
}

const update = ({ user, body }) => {
  return people.update({ ...body, user })
}

export default λ(
  auth((req, res) => {
    switch (req.method) {
      case 'GET':
        return fetch(req, res)
      case 'PATCH':
        return update(req, res)
      default:
    }

    throw createError('Not found', 404)
  })
)
