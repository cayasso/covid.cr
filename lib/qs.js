export const get = (name, url = window.location.href) => {
  name = name.replace(/[[\]]/g, '\\$&')
  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)')
  const results = regex.exec(url)
  if (!results) return null
  if (!results[2]) return ''
  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}

export const format = (parameters) => {
  const esc = encodeURIComponent
  return Object.keys(parameters)
    .map((k) => esc(k) + '=' + esc(parameters[k]))
    .join('&')
}
