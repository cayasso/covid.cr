'use strict'

import sms506 from 'sms506'
import { isString } from 'lodash'
import { createError } from './utils'

const mailer = ({ sms: { key } }) => {
  const api = sms506(key)

  const send = async (to, text) => {
    if (!isString(to)) {
      throw createError('Teléfono móvil inválido.')
    } else if (!isString(text)) {
      throw createError('Texto inválido.')
    }

    console.log('SENDING', to, text)
    return api.sms(to, text)
  }

  return { send }
}

export default mailer
