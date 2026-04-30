import { useEffect, useState } from 'react'

// Types `text` one character at a time. When text changes, the animation
// restarts. `speed` is ms per character. `startDelay` waits before the first
// character, useful for letting a parent transition settle first.
export default function Typewriter({ text, speed = 22, startDelay = 200, className = '', cursor = true, onComplete }) {
  const [shown, setShown] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    setShown('')
    setDone(false)
    let i = 0
    let cancelled = false

    const tick = () => {
      if (cancelled) return
      if (i >= text.length) {
        setDone(true)
        if (onComplete) onComplete()
        return
      }
      i += 1
      setShown(text.slice(0, i))
      setTimeout(tick, speed)
    }

    const startId = setTimeout(tick, startDelay)
    return () => {
      cancelled = true
      clearTimeout(startId)
    }
  }, [text, speed, startDelay, onComplete])

  return (
    <span className={className}>
      {shown}
      {cursor && !done && (
        <span className="inline-block w-[2px] h-[1em] -mb-[0.15em] ml-0.5 bg-current animate-pulse" />
      )}
    </span>
  )
}
