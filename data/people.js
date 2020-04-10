import { omit, pick, isNumber, isString } from 'lodash'
import isEmail from 'is-email'
import createDb from '../lib/db'
import { toPhone, createError, isPhone } from '../lib/utils'
import getRating from '../lib/rating'
import { createToken, getCode } from '../lib/auth'

export const CLAIMS = ['_id']
export const FIELDS = [
  'sex',
  'age',
  'email',
  'phone',
  'province',
  'canton',
  'district',
  'risk',
  'social',
  'feeling',
  'symptoms',
  'history',
  'favorites',
  'postalcode',
]

export const PRIVATE_FIELDS = [
  'lastCodeUpdate',
  'confirmed',
  'confirmedTime',
  'lastSignedIn',
  'phone',
  'code',
]

const createApi = ({ mongo, secret }) => {
  const db = createDb(mongo)

  const fetch = async ({ id, user, ...query }) => {
    const people = await db.get('people')
    if (id) query._id = id
    const doc = id ? await people.findOne(query) : await people.findMany(query)
    if (!doc) throw createError('Usuario no encontrado', 404)
    return id ? getRating(doc) : doc
  }

  const update = async ({ user, id, ...data }) => {
    const people = await db.get('people')
    const query = { _id: user._id }

    if (data.age) {
      data.age = Number.parseInt(data.age, 10)
    }

    if (data.sex && !['M', 'F'].includes(data.sex)) {
      throw createError('Valor sexo inválido, debe ser F ó M')
    } else if (data.age && !isNumber(data.age)) {
      throw createError('Edad inválida')
    } else if (data.phone && !(data.phone = toPhone(data.phone))) {
      throw createError('Teléfono inválido')
    } else if (data.email && !isEmail(data.email)) {
      throw createError('Email inválido')
    }

    data = pick(data, FIELDS)
    data.updated = Date.now()

    const parameters = { $set: data }

    if (data.symptoms || data.feeling) {
      parameters.$push = {
        history: { time: data.updated, symptoms: data.symptoms, feeling: data.feeling },
      }
    }

    const person = await people.updateOne(query, parameters)
    if (!person) throw createError('No se pudo actualizar')
    return getRating(omit(person, PRIVATE_FIELDS))
  }

  const signin = async ({ code, phone }) => {
    const people = await db.get('people')

    if (!isPhone(phone)) {
      throw createError('Teléfono móvil inválido')
    } else if (!code || !isString(code)) {
      throw createError('Código de verificación inválido')
    }

    let person = await people.findOne({ code, phone: toPhone(phone) })

    if (!person) {
      throw createError('Código de verificación inválido')
    }

    const time = Date.now()
    const data = { phone, updated: time, lastSignedIn: time }

    if (!person.confirmed) {
      data.confirmedTime = time
      data.confirmed = true
    }

    person = await people.updateOne({ phone }, data)
    const token = await createToken(pick(person, CLAIMS), { secret, ttl: '120d' })
    return { token, user: omit(person, PRIVATE_FIELDS) }
  }

  const fetchCode = async ({ phone }) => {
    const people = await db.get('people')

    if (!isPhone(phone)) {
      throw createError('Teléfono móvil inválido')
    }

    phone = toPhone(phone)
    const person = await people.findOne({ phone })

    if (!person) {
      return {}
      // throw createError('Not found', 404)
    }

    return {
      updated: person.lastCodeUpdate,
      code: person.code ? '****' + person.code.slice(-2) : null,
    }
  }

  const createCode = async ({ phone }) => {
    const people = await db.get('people')

    if (!isPhone(phone)) {
      throw createError('Teléfono móvil inválido')
    }

    phone = toPhone(phone)
    const code = await getCode()
    const updated = Date.now()

    await people.updateOne({ phone }, { code, lastCodeUpdate: updated }, { upsert: true })
    return { phone, code, updated }
  }

  return { fetch, update, signin, fetchCode, createCode }
}

export default createApi
