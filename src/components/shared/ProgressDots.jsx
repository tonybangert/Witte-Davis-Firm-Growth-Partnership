export default function ProgressDots({ sections, sectionIndex, onJump }) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-40">
      {sections.map((s, i) => {
        const active = i === sectionIndex
        return (
          <button
            key={s.id}
            onClick={() => onJump(i)}
            aria-label={`Jump to section ${s.label}`}
            className={`h-1.5 rounded-full transition-all ease-deliberate duration-300 ${
              active ? 'w-8 bg-copper' : 'w-1.5 bg-rule hover:bg-muted'
            }`}
          />
        )
      })}
    </div>
  )
}
