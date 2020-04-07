'use strict'

import { isString, isObject, isNumber } from 'lodash'
import { MongoClient, ObjectID } from 'mongodb'

/**
 * Casts to objectid
 *
 * @param {Mixed} str - hex id or ObjectId
 * @return {ObjectId}
 * @api public
 */

const getId = (string) => {
  if (string === null) return new ObjectID()
  return typeof string === 'string' ? ObjectID.createFromHexString(string) : string
}

const isObjectID = (id) => {
  if (id === null) return false

  if (isNumber(id)) return true

  if (isString(id)) {
    return id.length === 24 && /^[\da-fA-F]{24}$/.test(id)
  }

  if (id instanceof ObjectID) {
    return true
  }

  return false
}

const parseSort = (key = '') => {
  if (Array.isArray(key)) {
    const keys = key.map(parseSort)
    return Object.assign(...keys)
  }

  const [sign] = key.match(/^[+-]/) || []
  if (sign) key = key.substring(1)
  const dir = sign === '-' ? -1 : 1
  return { [key]: dir }
}

/**
 * Applies ObjectID casting to _id fields.
 *
 * @param {Object} obj, query
 * @return {Object} query
 * @private
 */
const cast = (object) => {
  if (Array.isArray(object)) {
    return object.map(cast)
  }

  if (object && isObject(object)) {
    Object.keys(object).forEach((k) => {
      if (k === '_id' && object._id) {
        if (object._id.$in) {
          object._id.$in = object._id.$in.map(getId)
        } else if (object._id.$nin) {
          object._id.$nin = object._id.$nin.map(getId)
        } else if (object._id.$ne) {
          object._id.$ne = getId(object._id.$ne)
        } else {
          object._id = getId(object._id)
        }
      } else {
        object[k] = cast(object[k])
      }
    })
  }

  return object
}

const parse = (change) => {
  const { operationType, ns, fullDocument, documentKey, updateDescription } = change

  switch (operationType) {
    case 'insert':
      return {
        type: `${ns.coll}::created`,
        data: fullDocument,
      }

    case 'update':
      return {
        type: `${ns.coll}::updated`,
        data: fullDocument || { ...documentKey, ...updateDescription.updatedFields },
      }

    case 'delete':
      return {
        type: `${ns.coll}::deleted`,
        data: documentKey,
      }

    default:
  }
}

const collection = (col, opt) => {
  const castId = opt.castIds === false ? (n) => n : cast

  const findById = (_id) => {
    return findOne({ _id })
  }

  const findOne = (query) => {
    return col.findOne(castId(query))
  }

  const findMany = (query = {}, { sort = '_id', limit = 1000, page = 0, ...options } = {}) => {
    limit = parseInt(limit, 10)
    page = parseInt(page, 10)
    sort = parseSort(sort)

    const skip = page > 0 ? (page - 1) * limit : 0
    return col.find(castId(query), { limit, sort, skip, ...options }).toArray()
  }

  const insertOne = async (data) => {
    data._id = data._id || getId()
    await col.insertOne(castId(data))
    return data
  }

  const insertMany = (data) => {
    return col.insertMany(data)
  }

  const updateById = (_id, data) => {
    return updateOne({ _id }, data)
  }

  const hasOperator = (data) => {
    return Object.keys(data).some((key) => key.indexOf('$') !== 0)
  }

  const updateOne = async (query, data, options = {}) => {
    const update = hasOperator(data) ? { $set: data } : data
    const doc = await col.findOneAndUpdate(castId(query), castId(update), {
      returnOriginal: false,
      ...options,
    })
    return result(doc)
  }

  const updateMany = (query, data, options = {}) => {
    const update = hasOperator(data) ? { $set: data } : data
    return col.updateMany(query, update, options)
  }

  const deleteById = (_id) => {
    return deleteOne({ _id })
  }

  const deleteOne = async (query) => {
    const doc = await col.findOneAndDelete(castId(query))
    return result(doc)
  }

  const result = (doc) => {
    if (doc && typeof doc.value !== 'undefined') {
      return doc.value
    }

    if (doc.ok && doc.lastErrorObject && doc.lastErrorObject.n === 0) {
      return null
    }

    return doc
  }

  const createIndex = (...args) => {
    return col.createIndex(...args)
  }

  const watch = (cb) => {
    const changeStream = col.watch({ fullDocument: 'updateLookup' })

    changeStream.on('change', (change) => {
      const data = parse(change)
      if (data) cb(data)
    })

    changeStream.on('error', (error) => {
      console.log('ChangeStream', error)
    })

    return changeStream
  }

  const aggregate = (pipeline, options) => {
    return col.aggregate(pipeline, options).toArray()
  }

  return {
    watch,
    findOne,
    findById,
    findMany,
    insertOne,
    insertMany,
    updateById,
    updateOne,
    updateMany,
    deleteById,
    deleteOne,
    createIndex,
    aggregate,
  }
}

/**
 * Create MongoDB connected client.
 *
 * @param {String} uri
 * @return {Promise} db
 * @type public
 */

export default (uri) => {
  let client = null

  /**
   * Connect to mongodb.
   *
   * @return {Promise}
   * @type private
   */

  const connect = () => {
    if (client && !client.isConnected) {
      client = null
    }

    if (client === null) {
      client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    } else if (client.isConnected) {
      return client.db()
    }

    return new Promise((resolve, reject) => {
      client.connect((error) => {
        if (error) {
          client = null
          return reject(error)
        }

        resolve(client.db())
      })
    })
  }

  /**
   * Close db connection.
   *
   * @return {Promise}
   * @type public
   */

  const close = () => {
    if (!client || !client.isConnected) return
    return client.close(true)
  }

  /**
   * Get collection.
   *
   * @param {String} name
   * @return {Object}
   * @type public
   */

  const get = async (name, options = {}) => {
    const db = await connect()
    return collection(db.collection(name), { castId: true, ...options })
  }

  const dropDatabase = (name) => {
    if (!client || !client.isConnected) return
    return client.db(name).dropDatabase()
  }

  return { cast, close, get, id: getId, isObjectID, dropDatabase }
}
