import unfetch from 'isomorphic-unfetch'

export const fetch = async (...args) => {
  const response = await unfetch(...args)

  if (response.ok) {
    return response.json()
  }

  const data = await response.json()
  const error = new Error(data ? data.message : response.statusText)
  // error.response = response
  return Promise.reject(error)
}

export const fetchText = async (...args) => {
  const response = await unfetch(...args)
  if (response.ok) return response.text()

  const data = await response.json()
  const error = new Error(data ? data.message : response.statusText)
  // error.response = response
  return Promise.reject(error)
}

export const authFetch = (url, token, options = {}) =>
  fetch(url, {
    ...options,
    headers: { ...options?.headers, authorization: `Bearer ${token}` },
  })
