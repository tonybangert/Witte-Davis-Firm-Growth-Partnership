import { motion } from 'framer-motion'

// 3x2 card grid. Five scene cards reveal sequentially via arrow key. Sixth
// slot holds the thesis card, revealed last. Dark forest surface mirrors
// Section 1, closing the emotional bookend without typography overflow.
const SCENES = [
  {
    eyebrow: 'On a Tuesday in April',
    body: 'Heather closes her laptop at 5:47 PM. The day is finished, on time, for the first time in longer than she can remember.'
  },
  {
    eyebrow: 'In court on Monday',
    body: 'Ned was already drafting the next set of motions when Heather walked in. The firm has not paused for a single one of her three trials this year.'
  },
  {
    eyebrow: 'On Thursday afternoon',
    body: 'Kathleen reconciled the month’s books from her phone, on the way home. The reconstruction stopped happening months ago.'
  },
  {
    eyebrow: 'On the work that finds you',
    body: 'The third PFAS matter this quarter, you turned down. The fourth was the right one. The choosing has become possible.'
  },
  {
    eyebrow: 'In Madison this morning',
    body: 'Ned is testifying on the NR 720 revision. He is the one shaping the rule, not the one absorbing it.'
  }
]

const THESIS = 'This is what we are actually trying to buy you.'

export default function Section8WhatThisBuys({ step }) {
  return (
    <div className="w-full h-full flex flex-col p-12 gap-8 text-cream">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-baseline justify-between"
      >
        <div>
          <div className="font-mono text-[11px] uppercase tracking-widest text-copper-soft mb-2">
            A year from now
          </div>
          <h1 className="font-serif text-4xl font-semibold text-cream leading-tight">
            What this actually buys you.
          </h1>
        </div>
      </motion.div>

      <div className="grid grid-cols-3 grid-rows-2 gap-5 flex-1 min-h-0">
        {SCENES.map((scene, i) => (
          <SceneCard
            key={i}
            scene={scene}
            revealed={step >= i}
            current={step === i}
          />
        ))}
        <ThesisCard revealed={step >= SCENES.length} />
      </div>
    </div>
  )
}

function SceneCard({ scene, revealed, current }) {
  return (
    <motion.div
      initial={false}
      animate={{
        opacity: revealed ? 1 : 0.08,
        y: revealed ? 0 : 8
      }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: revealed ? 0.05 : 0 }}
      className={`rounded-sm p-7 flex flex-col bg-forest-soft transition-colors duration-500 ${
        current ? 'border-2 border-copper' : 'border border-cream/15'
      }`}
    >
      <div className="font-mono text-[10px] uppercase tracking-widest text-copper-soft mb-4">
        {scene.eyebrow}
      </div>
      <div className="font-serif text-xl italic leading-relaxed text-cream/95">
        {scene.body}
      </div>
    </motion.div>
  )
}

function ThesisCard({ revealed }) {
  return (
    <motion.div
      initial={false}
      animate={{
        opacity: revealed ? 1 : 0.08,
        y: revealed ? 0 : 8,
        scale: revealed ? 1 : 0.99
      }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: revealed ? 0.1 : 0 }}
      className="rounded-sm p-7 flex flex-col items-center justify-center text-center border-2 border-copper bg-copper/5"
    >
      <div className="font-mono text-[10px] uppercase tracking-widest text-copper-soft mb-4">
        The thesis
      </div>
      <div className="font-serif text-2xl text-copper-soft leading-snug">
        {THESIS}
      </div>
    </motion.div>
  )
}
