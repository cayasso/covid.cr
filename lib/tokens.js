import * as cookies from './cookies'

export const set = (token, ctx, opt = {}) =>
  cookies.set('token', token, ctx, {
    path: '/',
    maxAge: 90 * 24 * 60 * 60,
    ...opt
  })

export const get = ctx => {
  return cookies.get('token', ctx)
}

export const del = (ctx, opt = {}) => {
  return cookies.del('token', ctx, { path: '/', ...opt })
}
