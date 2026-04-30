import { motion } from 'framer-motion'

export default function Section9Close() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-12 text-cream text-center p-16">
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="font-serif text-7xl font-semibold text-cream"
      >
        Thank you.
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="grid grid-cols-[1fr_auto_1fr] items-center gap-10 w-full"
      >
        <span className="font-serif text-3xl text-cream/95 tracking-tight text-right">
          Aplora<span className="font-light italic text-cream/70">.ai</span>
        </span>
        <div className="w-px h-10 bg-cream/30" />
        <span className="font-serif text-3xl text-cream/95 tracking-tight text-left">
          PerformanceLabs<span className="font-light italic text-cream/70">.ai</span>
        </span>
      </motion.div>
    </div>
  )
}
