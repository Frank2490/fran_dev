import { useEffect, useState } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

export function useScramble(text: string, start: boolean, speed: number = 30) {
  const [display, setDisplay] = useState(text)

  useEffect(() => {
    if (!start) return
    let iteration = 0
    const interval = setInterval(() => {
      setDisplay(
        text
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' '
            if (i < iteration) return text[i]
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          })
          .join('')
      )
      iteration += 0.5
      if (iteration >= text.length) clearInterval(interval)
    }, speed)
    return () => clearInterval(interval)
  }, [start, text, speed])

  return display
}
