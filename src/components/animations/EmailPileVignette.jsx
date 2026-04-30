// Cold-open vignette stub. Final implementation will animate an inbox count
// climbing while a timestamp ticks past 11pm. Placeholder layout for now.
export default function EmailPileVignette() {
  return (
    <div className="border border-cream/20 rounded-sm p-6 text-cream/80">
      <div className="font-mono text-[11px] uppercase tracking-widest text-copper mb-2">
        Inbox · 11:23 PM
      </div>
      <div className="font-serif text-5xl font-semibold">47 unread</div>
      <ul className="mt-4 space-y-1.5 text-[11px] font-mono text-cream/75">
        <li className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-copper" />
          2 require attention
        </li>
        <li className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-sage" />
          zero urgent
        </li>
        <li className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-watershed" />
          12 reply drafts ready for your approval
        </li>
      </ul>
    </div>
  )
}
