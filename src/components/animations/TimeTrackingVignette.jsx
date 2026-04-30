// Cold-open vignette stub. Final implementation will visualize sparse
// billable-hour blocks with question marks reconstructing time entries.
export default function TimeTrackingVignette() {
  return (
    <div className="border border-cream/20 rounded-sm p-6 text-cream/80">
      <div className="font-mono text-[11px] uppercase tracking-widest text-copper mb-2">
        Time · this week
      </div>
      <div className="font-serif text-5xl font-semibold">38 hrs</div>
      <div className="grid grid-cols-7 gap-1 mt-3">
        {Array.from({ length: 21 }).map((_, i) => (
          <div
            key={i}
            className={`h-2 rounded-sm ${i < 19 ? 'bg-watershed/70' : 'bg-cream/15'}`}
          />
        ))}
      </div>
      <ul className="mt-4 space-y-1.5 text-[11px] font-mono text-cream/75">
        <li className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-watershed" />
          across 7 active matters
        </li>
        <li className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-sage" />
          bound to client narrative
        </li>
        <li className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-copper" />
          zero reconstruction
        </li>
      </ul>
    </div>
  )
}
