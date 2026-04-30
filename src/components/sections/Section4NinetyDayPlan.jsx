import { motion } from 'framer-motion'
import { timeline } from '../../data/timelineData.js'

// Arrow key drives reveal. step 0 = Foundation, step 1 = + Build, step 2 = + Scale.
export default function Section4NinetyDayPlan({ step }) {
  return (
    <div className="w-full h-full flex flex-col p-12 gap-8">
      <div>
        <div className="font-mono text-[11px] uppercase tracking-widest text-copper mb-2">
          Section 4 · The 90-Day Plan
        </div>
        <h1 className="font-serif text-4xl font-semibold text-forest">
          Three months. Three phases. Measured outcomes.
        </h1>
      </div>

      <div className="grid grid-cols-3 gap-6 flex-1">
        {timeline.map((t, i) => {
          const revealed = step >= i
          const isLatest = step === i
          return (
            <motion.div
              key={t.id}
              initial={false}
              animate={{
                opacity: revealed ? 1 : 0,
                y: revealed ? 0 : 24
              }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: revealed ? 0.05 : 0 }}
              className={`border rounded-sm p-6 flex flex-col ${
                isLatest ? 'border-copper bg-cream' : 'border-rule bg-bone'
              }`}
              style={{ pointerEvents: revealed ? 'auto' : 'none' }}
            >
              <div className="font-mono text-[11px] uppercase tracking-widest text-copper mb-3">
                {t.label}
              </div>
              <div className="font-serif italic text-lg text-forest mb-4 leading-snug">
                {t.tagline}
              </div>
              <ul className="space-y-2 text-sm text-ink/85 mb-4 flex-1">
                {t.deliverables.map((d, j) => (
                  <li key={j} className="flex gap-2">
                    <span className="text-watershed mt-1">·</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-3 border-t border-rule">
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted mb-1">
                  Ship
                </div>
                <div className="text-sm font-medium text-forest">{t.ship}</div>
              </div>
              {t.kathleenNote && (
                <div className="mt-3 p-3 bg-watershed/10 border-l-2 border-watershed text-xs text-ink/80">
                  {t.kathleenNote}
                </div>
              )}
            </motion.div>
          )
        })}
      </div>

      <div className="font-mono text-[10px] uppercase tracking-widest text-muted">
        {step + 1} of {timeline.length} · arrow key to reveal next phase
      </div>
    </div>
  )
}
