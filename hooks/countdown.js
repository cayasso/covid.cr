import { useCallback, useEffect, useState } from 'react'

const useCountDown = (startTime = 60 * 1000, interval = 1000) => {
  const [time, setTime] = useState(0)

  const start = useCallback(newStartTime => setTime(newStartTime || startTime), [])

  let timer = null

  useEffect(() => {
    if (time === 0) return

    clearTimeout(timer)

    timer = setTimeout(() => {
      const seconds = time - interval > 0 ? time - interval : 0
      setTime(seconds)
    }, interval)

    return () => clearTimeout(timer)
  }, [time, timer])

  return { time, start }
}

export default useCountDown
