import cookies from 'nookies'

export const get = (key, ctx = null) => {
  const cookie = cookies.get(ctx)
  return key ? cookie[key] : cookie
}

export const set = (key, val, ctx = null, opt) => {
  return cookies.set(ctx, key, val, opt)
}

export const del = (key, ctx = null, opt) => {
  return cookies.destroy(ctx, key, opt)
}
