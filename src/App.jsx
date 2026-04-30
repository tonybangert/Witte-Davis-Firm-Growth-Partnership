import { AnimatePresence, motion } from 'framer-motion'
import Section1ColdOpen from './components/sections/Section1ColdOpen.jsx'
import Section2TheFirm from './components/sections/Section2TheFirm.jsx'
import Section3Engagement from './components/sections/Section3Engagement.jsx'
import Section4NinetyDayPlan from './components/sections/Section4NinetyDayPlan.jsx'
import Section5AploraDemo from './components/sections/Section5AploraDemo.jsx'
import Section6TimeRecovery from './components/sections/Section6TimeRecovery.jsx'
import Section7Investment from './components/sections/Section7Investment.jsx'
import Section8WhatThisBuys from './components/sections/Section8WhatThisBuys.jsx'
import Section9Close from './components/sections/Section9Close.jsx'
import ProgressDots from './components/shared/ProgressDots.jsx'
import SectionMap from './components/shared/SectionMap.jsx'
import BackgroundLayers from './components/shared/BackgroundLayers.jsx'
import { useDeckState } from './hooks/useDeckState.js'

const SECTIONS = [
  { id: 1, label: 'Cold Open',       component: Section1ColdOpen,      steps: 0, surface: 'dark',  hideChrome: true },
  { id: 2, label: 'The Firm',        component: Section2TheFirm,       steps: 3, surface: 'cream' },
  { id: 3, label: 'Engagement',      component: Section3Engagement,    steps: 3, surface: 'cream' },
  { id: 4, label: '90-Day Plan',     component: Section4NinetyDayPlan, steps: 3, surface: 'cream' },
  { id: 5, label: 'Aplora Demo',     component: Section5AploraDemo,    steps: 2, surface: 'dark'  },
  { id: 6, label: 'Year 1 Value',    component: Section6TimeRecovery,  steps: 3, surface: 'cream' },
  { id: 7, label: 'A Year From Now', component: Section8WhatThisBuys,  steps: 5, surface: 'dark'  },
  { id: 8, label: 'Investment',      component: Section7Investment,    steps: 1, surface: 'cream' },
  { id: 9, label: 'Thank You',       component: Section9Close,         steps: 0, surface: 'dark'  }
]

const variants = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
  center: { opacity: 1, x: 0 },
  exit:  (dir) => ({ opacity: 0, x: dir > 0 ? -60 : 60 })
}

export default function App() {
  const { sectionIndex, step, direction, next, jumpSection } = useDeckState(SECTIONS)
  const current = SECTIONS[sectionIndex]
  const Current = current.component

  const surfaceBg = current.surface === 'dark' ? 'bg-forest' : 'bg-bone'
  const surfaceText = current.surface === 'dark' ? 'text-cream' : 'text-ink'

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden">
      <BackgroundLayers surface={current.surface} />

      <div className={`slide-stage relative ${surfaceBg} ${surfaceText} shadow-[0_30px_80px_rgba(10,20,15,0.35)] overflow-hidden rounded-sm`}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={sectionIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Current step={step} onAdvance={next} />
          </motion.div>
        </AnimatePresence>
      </div>

      {!current.hideChrome && (
        <ProgressDots
          sections={SECTIONS}
          sectionIndex={sectionIndex}
          onJump={jumpSection}
        />
      )}

      <SectionMap
        sections={SECTIONS}
        sectionIndex={sectionIndex}
        onJump={jumpSection}
      />
    </div>
  )
}
