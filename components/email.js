import { useEffect, useState } from 'react'

const Email = ({ email, timeout }) => {
  const mask = email.split('').map(char => (char === '@' ? '@' : '.'))
  const [text, setText] = useState(mask || '-@-')

  useEffect(() => {
    setTimeout(setText, timeout || 100, email)
  }, [email])

  return <strong>{text}</strong>
}

export default Email
