import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { defaults, pillars } from '../../data/quantifiedBenefits.js'

// Four-act sequence:
//   step 0  Pillar 1 · Recovered Time         (calendar friction evaporating)
//   step 1  Pillar 2 · Aplora Legal           (queries stacking with min-saved)
//   step 2  Pillar 3 · Brand and Engine       (matters compounding)
//   step 3  Year 1 capacity recovered (sum)
//
// Inputs live in a drawer that Tony can open at any step.

export default function Section6TimeRecovery({ step }) {
  const [inputs, setInputs] = useState(defaults)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const totals = useMemo(() => pillars.map((p) => p.compute(inputs)), [inputs])
  const grandTotal = totals.reduce((s, t) => s + t.value, 0)

  const activePillar = step <= 2 ? pillars[step] : null

  return (
    <div className="w-full h-full flex flex-col p-12 gap-6 relative">
      <Header step={step} pillar={activePillar} />

      <div className="flex-1 min-h-0">
        {step === 0 && <RecoveredTimePanel inputs={inputs} totals={totals[0]} />}
        {step === 1 && <AploraPanel inputs={inputs} totals={totals[1]} />}
        {step === 2 && <BrandPanel inputs={inputs} totals={totals[2]} />}
        {step === 3 && <AggregatePanel totals={totals} grandTotal={grandTotal} />}
      </div>

      <RunningTotal totals={totals} step={step} grandTotal={grandTotal} />

      <TuneDrawer
        open={drawerOpen}
        onToggle={() => setDrawerOpen((o) => !o)}
        inputs={inputs}
        setInputs={setInputs}
        step={step}
      />
    </div>
  )
}

function Header({ step, pillar }) {
  if (step === 3) {
    return (
      <div>
        <div className="font-mono text-[11px] uppercase tracking-widest text-copper mb-2">
          Section 6 · Year 1 Capacity Recovered
        </div>
        <h1 className="font-serif text-4xl font-semibold text-forest">
          The three pillars, in dollars and hours.
        </h1>
      </div>
    )
  }
  return (
    <div className="flex items-end justify-between">
      <div>
        <div className="font-mono text-[11px] uppercase tracking-widest text-copper mb-2">
          Section 6 · {pillar.eyebrow} · {pillar.title}
        </div>
        <h1 className="font-serif text-4xl font-semibold text-forest leading-tight">
          {pillar.framing}
        </h1>
        <p className="text-ink/70 text-sm mt-2 max-w-2xl leading-relaxed">{pillar.narration}</p>
      </div>
    </div>
  )
}

/* -------------------- Pillar 1: Recovered Time -------------------- */

function RecoveredTimePanel({ inputs, totals }) {
  const totalFrictionCells = Math.round(inputs.hoursRecoveredPerWeekPerAttorney * 2)
  const [evaporated, setEvaporated] = useState(0)

  useEffect(() => {
    setEvaporated(0)
    const id = setInterval(() => {
      setEvaporated((n) => {
        if (n >= totalFrictionCells) {
          clearInterval(id)
          return n
        }
        return n + 1
      })
    }, 220)
    return () => clearInterval(id)
  }, [totalFrictionCells])

  const recoveredHoursVisible = evaporated * 0.5

  return (
    <div className="grid grid-cols-[1.4fr_1fr] gap-8 h-full">
      <CalendarFriction
        attorneys={2}
        frictionCells={totalFrictionCells}
        evaporated={evaporated}
      />
      <div className="flex flex-col justify-center gap-6 border-l border-rule pl-8">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-muted mb-2">
            Hours coming back this week
          </div>
          <div className="font-serif text-7xl font-semibold text-copper tabular-nums">
            {recoveredHoursVisible.toFixed(1)}
            <span className="text-3xl text-copper/60 ml-1">hrs</span>
          </div>
        </div>
        <div className="border-t border-rule pt-4">
          <div className="font-mono text-[10px] uppercase tracking-widest text-muted mb-1">
            Across the year
          </div>
          <div className="font-serif text-3xl text-forest">
            {Math.round(totals.hoursPerYear)} hrs recovered
          </div>
          <div className="font-mono text-sm text-watershed mt-2">
            ≈ ${Math.round(totals.value).toLocaleString()} of billable capacity
          </div>
        </div>
        <FrictionLegend categories={pillars[0].frictionCategories} />
      </div>
    </div>
  )
}

function CalendarFriction({ attorneys, frictionCells, evaporated }) {
  const days = 5
  const slotsPerDay = 8
  const totalSlots = days * slotsPerDay

  // Mark friction positions deterministically across the two attorney grids
  const frictionPositions = useMemo(() => {
    const out = []
    for (let a = 0; a < attorneys; a++) {
      const positions = []
      let seed = a * 17 + 3
      while (positions.length < frictionCells) {
        seed = (seed * 9301 + 49297) % 233280
        const idx = seed % totalSlots
        if (!positions.includes(idx)) positions.push(idx)
      }
      out.push(positions)
    }
    return out
  }, [attorneys, frictionCells, totalSlots])

  return (
    <div className="grid grid-rows-2 gap-4 h-full">
      {Array.from({ length: attorneys }).map((_, a) => (
        <div key={a} className="border border-rule rounded-sm p-4 bg-bone flex flex-col">
          <div className="font-mono text-[10px] uppercase tracking-widest text-muted mb-2">
            Attorney {a + 1} · this week
          </div>
          <div className="grid grid-cols-5 gap-1 flex-1">
            {Array.from({ length: days }).map((_, d) => (
              <div key={d} className="grid grid-rows-8 gap-1 h-full">
                {Array.from({ length: slotsPerDay }).map((_, s) => {
                  const idx = d * slotsPerDay + s
                  const isFriction = frictionPositions[a].includes(idx)
                  const frictionRank = frictionPositions[a].indexOf(idx)
                  // Evaporate friction blocks one at a time across both attorneys
                  const globalRank = a * frictionCells + frictionRank
                  const evaporatedThis = isFriction && globalRank < evaporated
                  return (
                    <motion.div
                      key={s}
                      initial={false}
                      animate={
                        evaporatedThis
                          ? { backgroundColor: 'rgba(143, 166, 142, 0.25)', scale: 1, opacity: 1 }
                          : isFriction
                          ? { backgroundColor: 'rgba(184, 111, 61, 0.85)', scale: 1, opacity: 1 }
                          : { backgroundColor: 'rgba(217, 209, 192, 0.5)', scale: 1, opacity: 1 }
                      }
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="rounded-[2px]"
                    />
                  )
                })}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-5 gap-1 mt-1 font-mono text-[9px] text-muted">
            <div>M</div><div>T</div><div>W</div><div>Th</div><div>F</div>
          </div>
        </div>
      ))}
    </div>
  )
}

function FrictionLegend({ categories }) {
  return (
    <div className="space-y-1.5">
      {categories.map((c) => (
        <div key={c.label} className="flex items-center gap-2 text-xs text-ink/70">
          <span className="w-3 h-3 rounded-[2px]" style={{ background: c.color }} />
          {c.label}
        </div>
      ))}
    </div>
  )
}

/* -------------------- Pillar 2: Aplora Legal -------------------- */

const APLORA_QUERY_SAMPLES = [
  { label: 'PFAS soil action levels · WI/NC/KY/TX',   savedMin: 45 },
  { label: 'CSRD double-materiality scoping',          savedMin: 50 },
  { label: 'NR 700 closure standards comparison',      savedMin: 35 },
  { label: 'CA SB 253 reporting threshold check',      savedMin: 25 },
  { label: 'CERCLA arranger liability precedent',      savedMin: 40 },
  { label: 'Indemnity language for PFAS rollback',     savedMin: 30 },
  { label: 'TCEQ TRRP Tier 1 PCL lookup',              savedMin: 20 },
  { label: 'EPA May 2024 MCL implications memo',       savedMin: 55 }
]

function AploraPanel({ inputs, totals }) {
  const [revealed, setRevealed] = useState(0)
  const samples = APLORA_QUERY_SAMPLES.slice(0, 6)

  useEffect(() => {
    setRevealed(0)
    const id = setInterval(() => {
      setRevealed((n) => {
        if (n >= samples.length) { clearInterval(id); return n }
        return n + 1
      })
    }, 280)
    return () => clearInterval(id)
  }, [samples.length])

  const minutesAccumulated = samples.slice(0, revealed).reduce((s, q) => s + q.savedMin, 0)

  return (
    <div className="grid grid-cols-[1.5fr_1fr] gap-8 h-full">
      <div className="border border-rule rounded-sm p-5 bg-bone flex flex-col gap-2 overflow-hidden">
        <div className="font-mono text-[10px] uppercase tracking-widest text-muted mb-2">
          A typical week of Aplora queries
        </div>
        <AnimatePresence>
          {samples.slice(0, revealed).map((q, i) => (
            <motion.div
              key={q.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center justify-between border-b border-rule/60 py-2"
            >
              <div className="text-sm text-ink/85">{q.label}</div>
              <div className="font-mono text-xs text-watershed">+{q.savedMin} min saved</div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div className="text-[10px] font-mono text-muted mt-auto pt-2">
          Plus {Math.max(inputs.aploraQueriesPerWeek - samples.length, 0)} more this week
        </div>
      </div>
      <div className="flex flex-col justify-center gap-6 border-l border-rule pl-8">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-muted mb-2">
            Research time freed this week
          </div>
          <div className="font-serif text-7xl font-semibold text-copper tabular-nums">
            {(minutesAccumulated / 60).toFixed(1)}
            <span className="text-3xl text-copper/60 ml-1">hrs</span>
          </div>
        </div>
        <div className="border-t border-rule pt-4">
          <div className="font-mono text-[10px] uppercase tracking-widest text-muted mb-1">
            Across the year
          </div>
          <div className="font-serif text-3xl text-forest">
            {Math.round(totals.hoursPerYear)} research hours saved
          </div>
          <div className="font-mono text-sm text-watershed mt-2">
            ≈ ${Math.round(totals.value).toLocaleString()} of capacity returned
          </div>
        </div>
        <div className="text-[11px] text-ink/60 italic leading-relaxed">
          Privileged. Private. Yours. Every query stays inside the firm.
        </div>
      </div>
    </div>
  )
}

/* -------------------- Pillar 3: Brand and Engine -------------------- */

function BrandPanel({ inputs, totals }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    setProgress(0)
    let f
    const start = performance.now()
    const dur = 2200
    const tick = (t) => {
      const p = Math.min((t - start) / dur, 1)
      setProgress(p)
      if (p < 1) f = requestAnimationFrame(tick)
    }
    f = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(f)
  }, [inputs.newMattersPerYear, inputs.averageMatterValue])

  const matters = inputs.newMattersPerYear * progress
  const dollars = totals.value * progress

  return (
    <div className="grid grid-cols-[1.5fr_1fr] gap-8 h-full">
      <BrandTimeline progress={progress} matters={matters} />
      <div className="flex flex-col justify-center gap-6 border-l border-rule pl-8">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-muted mb-2">
            New matters originated · Year 1
          </div>
          <div className="font-serif text-7xl font-semibold text-copper tabular-nums">
            {matters.toFixed(1)}
          </div>
        </div>
        <div className="border-t border-rule pt-4">
          <div className="font-mono text-[10px] uppercase tracking-widest text-muted mb-1">
            Origination value
          </div>
          <div className="font-serif text-3xl text-forest tabular-nums">
            ${Math.round(dollars).toLocaleString()}
          </div>
          <div className="font-mono text-sm text-watershed mt-2">
            Average matter · ${(inputs.averageMatterValue / 1000).toFixed(0)}k
          </div>
        </div>
        <div className="text-[11px] text-ink/60 italic leading-relaxed">
          Thought leadership in print. Speaking opportunities surfaced. The work
          that finds you, not the work you chase.
        </div>
      </div>
    </div>
  )
}

function BrandTimeline({ progress, matters }) {
  const weeks = 52
  const filled = Math.round(progress * weeks)
  const matterMarkers = Array.from({ length: Math.floor(matters) }).map((_, i) => {
    const pos = ((i + 1) / Math.max(Math.floor(matters) + 1, 2))
    return pos
  })

  return (
    <div className="border border-rule rounded-sm p-5 bg-bone flex flex-col h-full">
      <div className="font-mono text-[10px] uppercase tracking-widest text-muted mb-2">
        Year 1 cadence
      </div>
      <div className="flex-1 flex flex-col justify-center gap-6">
        <Lane label="Thought leadership" filled={filled} weeks={weeks} accentColor="#B86F3D" cadence={4} />
        <Lane label="Speaking opportunities" filled={filled} weeks={weeks} accentColor="#3D6A8A" cadence={13} />
        <Lane label="BD touchpoints" filled={filled} weeks={weeks} accentColor="#8FA68E" cadence={2} />
        <div className="relative h-16 mt-4">
          <div className="absolute inset-x-0 top-1/2 h-px bg-rule" />
          <div
            className="absolute left-0 top-1/2 h-[2px] bg-copper"
            style={{ width: `${progress * 100}%` }}
          />
          {matterMarkers.map((pos, i) => (
            <div
              key={i}
              className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 flex flex-col items-center"
              style={{ left: `${pos * 100}%` }}
            >
              <div className="w-3 h-3 bg-copper rounded-full" />
              <div className="font-mono text-[10px] text-copper mt-1 whitespace-nowrap">
                new matter
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Lane({ label, filled, weeks, accentColor, cadence }) {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted">{label}</span>
        <span className="font-mono text-[10px] text-muted">every ~{cadence}w</span>
      </div>
      <div className="grid grid-cols-52 gap-[2px]" style={{ gridTemplateColumns: 'repeat(52, minmax(0, 1fr))' }}>
        {Array.from({ length: weeks }).map((_, w) => {
          const isMarker = w > 0 && w % cadence === 0
          const visible = w < filled
          return (
            <div
              key={w}
              className="h-3 rounded-[1px] transition-colors duration-200"
              style={{
                background: visible
                  ? (isMarker ? accentColor : 'rgba(217, 209, 192, 0.8)')
                  : 'rgba(217, 209, 192, 0.25)'
              }}
            />
          )
        })}
      </div>
    </div>
  )
}

/* -------------------- Aggregate -------------------- */

function AggregatePanel({ totals, grandTotal }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let f
    const start = performance.now()
    const tick = (t) => {
      const p = Math.min((t - start) / 1600, 1)
      setProgress(p)
      if (p < 1) f = requestAnimationFrame(tick)
    }
    f = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(f)
  }, [grandTotal])

  return (
    <div className="grid grid-cols-[2fr_1.4fr] gap-8 h-full">
      <div className="flex flex-col justify-center gap-3">
        {pillars.map((p, i) => {
          const v = totals[i].value
          const widthPct = (v / grandTotal) * 100 * progress
          return (
            <div key={p.id} className="border border-rule rounded-sm bg-bone p-5">
              <div className="flex items-baseline justify-between mb-3">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-copper mb-0.5">
                    {p.title}
                  </div>
                  <div className="font-serif italic text-base text-forest">{p.framing}</div>
                </div>
                <div className="font-serif text-3xl font-semibold text-forest tabular-nums">
                  ${Math.round(v * progress).toLocaleString()}
                </div>
              </div>
              <div className="h-2 bg-rule/60 rounded-full overflow-hidden">
                <div
                  className="h-full bg-copper rounded-full"
                  style={{ width: `${widthPct}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>
      <div className="flex flex-col items-center justify-center gap-6 border-l border-rule pl-8">
        <div className="text-center">
          <div className="font-mono text-[10px] uppercase tracking-widest text-muted mb-3">
            Year 1 capacity recovered
          </div>
          <div className="font-serif text-7xl font-semibold text-copper tabular-nums leading-none">
            ${Math.round(grandTotal * progress).toLocaleString()}
          </div>
        </div>
        <div className="text-center text-sm text-ink/70 italic max-w-xs leading-relaxed">
          The hours, the research, and the new work that the next twelve months
          can return to the firm.
        </div>
      </div>
    </div>
  )
}

/* -------------------- Footer running total + drawer -------------------- */

function RunningTotal({ totals, step, grandTotal }) {
  if (step === 3) return null
  return (
    <div className="flex items-center justify-between border-t border-rule pt-3">
      <div className="flex items-center gap-6">
        {pillars.map((p, i) => {
          const active = step === i
          const past = step > i
          return (
            <div key={p.id} className={`flex items-center gap-2 transition-opacity ${active ? 'opacity-100' : past ? 'opacity-80' : 'opacity-30'}`}>
              <div className={`w-1.5 h-6 rounded-full ${active ? 'bg-copper' : past ? 'bg-watershed' : 'bg-rule'}`} />
              <div>
                <div className="font-mono text-[9px] uppercase tracking-widest text-muted">{p.title}</div>
                <div className={`font-mono text-xs tabular-nums ${active ? 'text-forest font-semibold' : 'text-ink/70'}`}>
                  ${Math.round(totals[i].value).toLocaleString()}
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className="text-right">
        <div className="font-mono text-[9px] uppercase tracking-widest text-muted">Running</div>
        <div className="font-serif text-base text-forest tabular-nums">
          ${Math.round(grandTotal).toLocaleString()}
        </div>
      </div>
    </div>
  )
}

function TuneDrawer({ open, onToggle, inputs, setInputs, step }) {
  const activeInputs = step <= 2 ? pillars[step].inputs : []

  return (
    <>
      <button
        onClick={onToggle}
        className="absolute top-12 right-12 font-mono text-[10px] uppercase tracking-widest text-watershed hover:text-copper transition border-b border-watershed/40 hover:border-copper pb-0.5"
      >
        {open ? 'close assumptions' : 'tune assumptions →'}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-24 right-12 w-72 bg-bone border border-rule rounded-sm shadow-xl p-5 z-20"
          >
            <div className="font-mono text-[10px] uppercase tracking-widest text-muted mb-3">
              {step <= 2 ? `${pillars[step].title} · inputs` : 'aggregate'}
            </div>
            <div className="space-y-4">
              {activeInputs.map((cfg) => (
                <Slider
                  key={cfg.key}
                  label={cfg.label}
                  value={inputs[cfg.key]}
                  min={cfg.min}
                  max={cfg.max}
                  step={cfg.step}
                  format={cfg.format}
                  onChange={(v) => setInputs((p) => ({ ...p, [cfg.key]: v }))}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function Slider({ label, min, max, step, value, onChange, format }) {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted">{label}</span>
        <span className="font-mono text-xs text-forest font-semibold">{format(value)}</span>
      </div>
      <input
        type="range"
        min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full accent-copper"
      />
    </div>
  )
}
