import { motion } from 'framer-motion'
import EmailPileVignette from '../animations/EmailPileVignette.jsx'
import HandwrittenNoteVignette from '../animations/HandwrittenNoteVignette.jsx'
import TimeTrackingVignette from '../animations/TimeTrackingVignette.jsx'
import Wordmark from '../shared/Wordmark.jsx'

// Title page composition: firm and partnership lockup at top, narrative beat
// and friction cards in the middle, partner badge at bottom.
export default function Section1ColdOpen() {
  return (
    <div className="w-full h-full flex flex-col p-10">
      {/* TOP: firm + partnership */}
      <header className="flex flex-col items-center gap-3 pt-2">
        <Wordmark size="lg" className="brightness-0 invert" />
        <div className="font-mono text-[11px] uppercase tracking-widest text-copper-soft">
          A 90-Day Partnership
        </div>
      </header>

      {/* MIDDLE: narrative beat + friction cards */}
      <main className="flex-1 flex flex-col items-center justify-center gap-8 my-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-mono text-sm text-cream/70 tracking-widest"
        >
          It is Tuesday at 7:47 PM.
        </motion.div>

        <div className="grid grid-cols-3 gap-6 max-w-5xl w-full">
          <EmailPileVignette />
          <HandwrittenNoteVignette />
          <TimeTrackingVignette />
        </div>
      </main>

    </div>
  )
}
