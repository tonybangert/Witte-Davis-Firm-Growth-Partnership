import { useState } from 'react'
import { Map } from 'lucide-react'

export default function SectionMap({ sections, sectionIndex, onJump }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed top-5 right-5 z-50">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Toggle section map"
        className="p-2 rounded-sm bg-bone/80 backdrop-blur border border-rule text-ink hover:bg-cream transition"
      >
        <Map size={16} />
      </button>

      {open && (
        <div className="mt-2 w-64 bg-bone border border-rule rounded-sm shadow-lg p-3 text-sm">
          <div className="font-mono text-xs uppercase tracking-wider text-muted mb-2">
            Sections
          </div>
          <ul className="space-y-1">
            {sections.map((s, i) => {
              const active = i === sectionIndex
              return (
                <li key={s.id}>
                  <button
                    onClick={() => { onJump(i); setOpen(false) }}
                    className={`w-full text-left flex items-center gap-3 py-1.5 px-2 rounded-sm transition ${
                      active ? 'bg-cream text-forest font-semibold' : 'text-ink hover:bg-cream/60'
                    }`}
                  >
                    <span className="font-mono text-[11px] text-muted w-5">
                      {String(s.id).padStart(2, '0')}
                    </span>
                    <span>{s.label}</span>
                  </button>
                </li>
              )
            })}
          </ul>
          <div className="mt-3 pt-2 border-t border-rule text-[11px] text-muted leading-relaxed">
            Arrow keys advance. Spacebar advances. Home and End jump to ends.
          </div>
        </div>
      )}
    </div>
  )
}
