import { fetch } from '../lib/fetch'
import { format } from '../lib/qs'
import * as tokens from '../lib/tokens'

const useUser = () => {
  const signin = async (phone, code) => {
    const { token, user } = await fetch('/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ phone, code })
    })
    tokens.set(token)
    return user
  }

  const update = async body => {
    return fetch('/api/me', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
  }

  const getCode = data => {
    return fetch(`/api/code?${format(data)}`)
  }

  const sendCode = phone => {
    return fetch('/api/code', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ phone })
    })
  }

  return { signin, update, getCode, sendCode }
}

export default useUser
