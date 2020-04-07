/* global BigInt */

import ms from 'ms'
import { omit } from 'lodash'
import Hashids from 'hashids/cjs'
import { verify, sign } from 'jsonwebtoken'
import * as securePin from 'secure-pin'
import { createError } from './utils'
import * as tokens from './tokens'
import { fetch } from './fetch'
import config from '../config'

const hashids = new Hashids(config.secret)

const ts = time => {
  return Date.now() + ms(time)
}

export const createToken = async (data, { secret = 'secret', ttl = '10m' } = {}) => {
  return new Promise((resolve, reject) => {
    sign(data, secret, { expiresIn: ts(ttl) }, (error, token) => {
      if (error) reject(error)
      else resolve(token)
    })
  })
}

export const verifyToken = (token, secret, options = {}) => {
  return new Promise((resolve, reject) => {
    verify(token, secret, options, (error, obj) => {
      if (error) reject(createError('Invalid access token', 401))
      else resolve(obj)
    })
  })
}

export const getRequestToken = req => {
  let { token } = req.cookies

  if (!token) {
    const bearer = req.headers.authorization
    if (bearer) token = bearer.replace(/Bearer /i, '')
  }

  return token
}

export const createAuth = ({ secret }) => fn => async (req, res) => {
  try {
    const token = getRequestToken(req)
    req.user = await verifyToken(token, secret)
  } catch (error) {
    console.log(error)
    throw createError('Unauthorized', 401)
  }

  return fn(req, res)
}

export const getSession = async ctx => {
  try {
    const { req } = ctx
    const protocol = req.protocol ? req.protocol : `http`
    const host = `${protocol}://${req.headers.host}`

    const token = tokens.get(ctx)
    const user = token
      ? await fetch(`${host}/api/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
      : null

    console.log('USER', user)

    return user && user._id ? { user: omit(user, ['code']) } : {}
  } catch (_) {
    return {}
  }
}

export const getCode = async (len = 6) => {
  return new Promise(resolve => securePin.generatePin(len, resolve))
}

export const encode = (phone, code) => {
  phone = phone.replace('+', '')
  return hashids.encode(BigInt(phone + code))
}

export const decode = str => {
  const decoded = (hashids.decode(str)[0] || '').toString()

  if (decoded) {
    const { phone, code } = decoded.match(/(?<phone>[0-9]+)(?<code>[0-9]{6})/).groups
    return { phone: '+' + phone, code }
  }

  return []
}
