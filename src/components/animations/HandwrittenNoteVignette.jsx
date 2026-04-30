// Cold-open vignette: research / knowledge state. Final implementation will
// animate hand-drawn pen strokes resolving into an indexed Aplora queue.
// Mirrors the inbox and time vignettes' dark transparent visual grammar so
// the three cards read as a cohesive set.
export default function HandwrittenNoteVignette() {
  return (
    <div className="border border-cream/20 rounded-sm p-6 text-cream/80">
      <div className="font-mono text-[11px] uppercase tracking-widest text-copper mb-2">
        Research · in flight
      </div>
      <div className="font-serif text-5xl font-semibold">23 answered</div>
      <ul className="mt-4 space-y-1.5 text-[11px] font-mono text-cream/75">
        <li className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-copper" />
          4 PFAS / WDNR threads
        </li>
        <li className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-watershed" />
          11 multi-state items tracked
        </li>
        <li className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-sage" />
          0 left the firm
        </li>
      </ul>
    </div>
  )
}
