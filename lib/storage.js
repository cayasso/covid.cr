export const get = (key, defaults) => {
  try {
    const data = localStorage.getItem(key)
    if (!data) return defaults
    return JSON.parse(data)
  } catch (error) {
    console.log(error)
    return defaults
  }
}

export const set = (key, data) => {
  try {
    data = JSON.stringify(data)
    localStorage.setItem(key, data)
  } catch (error) {
    console.log(error)
  }
}

export const del = key => {
  localStorage.removeItem(key)
}

export const clear = () => {
  localStorage.clear()
}
