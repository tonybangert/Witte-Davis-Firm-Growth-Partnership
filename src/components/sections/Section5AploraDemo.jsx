import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { aploraDemo } from '../../data/aploraDemoQuery.js'
import Typewriter from '../shared/Typewriter.jsx'

const PRACTICE_AREAS = ['PFAS', 'Climate Disclosure', 'Multi-State Regulatory', 'M&A Due Diligence']

// Phases inside step 1. Each transitions automatically with realistic timing.
//   idle         step 0
//   typing       query is being typed
//   cross_ref    "Cross-referencing 4 jurisdictional frameworks..."
//   reviewing    "Reviewing 23 regulatory documents..."
//   synthesizing "Synthesizing comparison..." (pulses)
//   streaming    response streams in character-by-character
//   complete     response fully landed; ready for memo preview
const PHASE_TIMINGS = {
  cross_ref:    1500,
  reviewing:    1700,
  synthesizing: 1800,
  responseDuration: 5800
}

export default function Section5AploraDemo({ step }) {
  const [phase, setPhase] = useState('idle')
  const [revealedChars, setRevealedChars] = useState(0)
  const queryDoneRef = useRef(false)

  // Drive phase progression off the deck step
  useEffect(() => {
    if (step === 0) {
      setPhase('idle')
      setRevealedChars(0)
      queryDoneRef.current = false
      return
    }
    if (step >= 1 && phase === 'idle') {
      setPhase('typing')
    }
  }, [step, phase])

  // After query finishes typing, advance through the thinking phases on timers
  const handleQueryDone = () => {
    if (queryDoneRef.current) return
    queryDoneRef.current = true
    setTimeout(() => setPhase('cross_ref'),    400)
    setTimeout(() => setPhase('reviewing'),    400 + PHASE_TIMINGS.cross_ref)
    setTimeout(() => setPhase('synthesizing'), 400 + PHASE_TIMINGS.cross_ref + PHASE_TIMINGS.reviewing)
    setTimeout(
      () => setPhase('streaming'),
      400 + PHASE_TIMINGS.cross_ref + PHASE_TIMINGS.reviewing + PHASE_TIMINGS.synthesizing
    )
  }

  // Stream the response by progressively revealing more characters
  useEffect(() => {
    if (phase !== 'streaming') return
    const total = aploraDemo.response.length
    const start = performance.now()
    let raf
    const tick = (t) => {
      const p = Math.min((t - start) / PHASE_TIMINGS.responseDuration, 1)
      setRevealedChars(Math.floor(p * total))
      if (p < 1) raf = requestAnimationFrame(tick)
      else setPhase('complete')
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [phase])

  const showQuery = phase !== 'idle'
  const showThinking = ['cross_ref', 'reviewing', 'synthesizing', 'streaming', 'complete'].includes(phase)
  const showResponse = phase === 'streaming' || phase === 'complete'
  const showMemo = step >= 2 && phase === 'complete'

  return (
    <div className="w-full h-full grid grid-cols-[200px_1fr_240px] gap-0 bg-forest text-cream relative">
      <aside className="border-r border-cream/10 p-5">
        <div className="font-mono text-[10px] uppercase tracking-widest text-copper mb-4">
          Practice
        </div>
        <ul className="space-y-2 text-sm">
          {PRACTICE_AREAS.map((p, i) => (
            <li
              key={p}
              className={`px-3 py-2 rounded-sm cursor-default ${
                i === 0 ? 'bg-copper/20 text-cream' : 'text-cream/60'
              }`}
            >
              {p}
            </li>
          ))}
        </ul>
      </aside>

      <main className="p-6 flex flex-col gap-4 overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="font-serif text-2xl flex items-baseline">
            <span className="font-semibold tracking-tight text-cream">Aplora</span>
            <span className="font-light italic ml-2 text-cream/80">Legal</span>
          </div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-cream/50">
            Privileged · Private · Yours
          </div>
        </div>

        {/* Query box */}
        <div className={`border ${showQuery ? 'border-copper' : 'border-cream/15'} rounded-sm p-4 bg-forest-soft transition-colors`}>
          <div className="font-mono text-[10px] uppercase tracking-widest text-cream/50 mb-2">
            Query
          </div>
          <div className="text-cream text-sm leading-relaxed min-h-[3.5rem]">
            {phase === 'idle' && <span className="text-cream/30">Ask Aplora Legal...</span>}
            {phase === 'typing' && (
              <Typewriter
                text={aploraDemo.query}
                speed={18}
                startDelay={250}
                onComplete={handleQueryDone}
              />
            )}
            {showQuery && phase !== 'typing' && aploraDemo.query}
          </div>
        </div>

        {/* Thinking lines: appear progressively, persist after streaming begins */}
        {showThinking && (
          <div className="text-sm font-mono space-y-1">
            <ThinkingLine
              active={phase === 'cross_ref'}
              past={['reviewing', 'synthesizing', 'streaming', 'complete'].includes(phase)}
              pulsing={false}
            >
              · Cross-referencing 4 jurisdictional frameworks...
            </ThinkingLine>
            {['reviewing', 'synthesizing', 'streaming', 'complete'].includes(phase) && (
              <ThinkingLine
                active={phase === 'reviewing'}
                past={['synthesizing', 'streaming', 'complete'].includes(phase)}
                pulsing={false}
              >
                · Reviewing 23 regulatory documents...
              </ThinkingLine>
            )}
            {['synthesizing', 'streaming', 'complete'].includes(phase) && (
              <ThinkingLine
                active={phase === 'synthesizing'}
                past={['streaming', 'complete'].includes(phase)}
                pulsing={phase === 'synthesizing'}
              >
                · Synthesizing comparison...
              </ThinkingLine>
            )}
          </div>
        )}

        {/* Response panel */}
        <AnimatePresence>
          {showResponse && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="border border-cream/15 rounded-sm p-5 bg-forest-soft overflow-y-auto flex-1"
            >
              <div className="font-mono text-[10px] uppercase tracking-widest text-copper mb-3">
                Response
              </div>
              <div className="text-cream/90 text-sm leading-relaxed whitespace-pre-line font-mono">
                {aploraDemo.response.slice(0, revealedChars)}
                {phase === 'streaming' && (
                  <span className="inline-block w-[7px] h-[1em] -mb-[0.15em] ml-0.5 bg-cream/80 animate-pulse" />
                )}
              </div>
              {phase === 'complete' && (
                <div className="mt-4 pt-4 border-t border-cream/10 flex gap-3 text-xs">
                  <button className="px-3 py-1.5 bg-copper/20 hover:bg-copper/30 text-copper-soft rounded-sm">
                    Save to Matter
                  </button>
                  <button className="px-3 py-1.5 bg-copper/20 hover:bg-copper/30 text-copper-soft rounded-sm">
                    Generate Client Memo
                  </button>
                  <label className="px-3 py-1.5 text-cream/70 flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="accent-copper" />
                    Track Regulatory Changes
                  </label>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Memo preview overlay (step 2) */}
        <AnimatePresence>
          {showMemo && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute right-6 bottom-6 w-72 bg-bone text-ink rounded-sm shadow-2xl p-5 border border-rule"
            >
              <div className="font-mono text-[10px] uppercase tracking-widest text-copper mb-2">
                Client Memo · Draft
              </div>
              <div className="font-serif text-sm font-semibold mb-1">
                PFAS Soil Action Levels: Multi-State Comparison
              </div>
              <div className="text-[11px] text-muted">
                Witte Davis Law · Privileged and Confidential
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <aside className="border-l border-cream/10 p-5">
        <div className="font-mono text-[10px] uppercase tracking-widest text-copper mb-3">
          Source library
        </div>
        <ul className="space-y-2 text-[11px] text-cream/70 font-mono">
          {aploraDemo.sources.map((s, i) => (
            <li key={i}>· {s}</li>
          ))}
        </ul>
      </aside>
    </div>
  )
}

function ThinkingLine({ children, active, past, pulsing }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`transition-colors duration-300 ${
        active ? 'text-cream' : past ? 'text-cream/40' : 'text-cream/70'
      } ${pulsing ? 'animate-pulse' : ''}`}
    >
      {children}
    </motion.div>
  )
}
