import { useCallback, useEffect, useState } from 'react'

// Section index + intra-section step. Arrow keys advance within a section's
// internal steps before moving to the next section. Spacebar advances. No
// click-to-advance (prevents accidental progression during conversation).
export function useDeckState(sections) {
  const [sectionIndex, setSectionIndex] = useState(0)
  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState(1)

  const totalSteps = sections[sectionIndex]?.steps ?? 0

  const next = useCallback(() => {
    setDirection(1)
    if (step < totalSteps) {
      setStep((s) => s + 1)
      return
    }
    setSectionIndex((i) => {
      const nextI = Math.min(i + 1, sections.length - 1)
      if (nextI !== i) setStep(0)
      return nextI
    })
  }, [step, totalSteps, sections.length])

  const prev = useCallback(() => {
    setDirection(-1)
    if (step > 0) {
      setStep((s) => s - 1)
      return
    }
    setSectionIndex((i) => {
      const prevI = Math.max(i - 1, 0)
      if (prevI !== i) setStep(sections[prevI].steps ?? 0)
      return prevI
    })
  }, [step, sections])

  const jumpSection = useCallback((target) => {
    setDirection(target > sectionIndex ? 1 : -1)
    setSectionIndex(target)
    setStep(0)
  }, [sectionIndex])

  const restartSection = useCallback(() => {
    setStep(0)
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault()
        next()
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault()
        prev()
      } else if (e.key === 'Home') {
        e.preventDefault()
        jumpSection(0)
      } else if (e.key === 'End') {
        e.preventDefault()
        jumpSection(sections.length - 1)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev, jumpSection, sections.length])

  return { sectionIndex, step, direction, next, prev, jumpSection, restartSection }
}
