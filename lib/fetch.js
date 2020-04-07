import unfetch from 'isomorphic-unfetch'

export const fetch = async (...args) => {
  const res = await unfetch(...args)
  if (res.ok) return res.json()

  const data = await res.json()
  const error = new Error(data ? data.message : res.statusText)
  error.response = res
  return Promise.reject(error)
}

export const fetchText = async (...args) => {
  const res = await unfetch(...args)
  if (res.ok) return res.text()

  const data = await res.json()
  const error = new Error(data ? data.message : res.statusText)
  error.response = res
  return Promise.reject(error)
}

export const authFetch = (url, token, options = {}) =>
  fetch(url, {
    ...options,
    headers: { ...options?.headers, authorization: `Bearer ${token}` }
  })
