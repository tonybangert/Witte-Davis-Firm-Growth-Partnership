const LINES = [
  {
    title: 'Aplora Legal Platform',
    monthly: 6000,
    detail: 'Private AI workspace, three release cycles, source library tuning, secure deployment.'
  },
  {
    title: 'Embedded Advisory',
    monthly: 6000,
    detail: 'Brand, BD, workflow automation, weekly working sessions with the team.'
  }
]

export default function Section7Investment() {
  const total = LINES.reduce((s, l) => s + l.monthly, 0) * 3

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-16 gap-10">
      <div className="text-center">
        <div className="font-mono text-[11px] uppercase tracking-widest text-copper mb-3">
          Section 7
        </div>
        <h1 className="font-serif text-5xl font-semibold text-forest">Investment</h1>
      </div>

      <div className="max-w-xl w-full border border-rule rounded-sm bg-cream p-8">
        {LINES.map((l) => (
          <div key={l.title} className="group flex items-baseline justify-between py-3 border-b border-rule/60 last:border-b-0">
            <div>
              <div className="font-serif text-xl text-forest">{l.title}</div>
              <div className="text-xs text-muted opacity-0 group-hover:opacity-100 transition-opacity max-w-md">
                {l.detail}
              </div>
            </div>
            <div className="font-mono text-sm text-forest">
              ${l.monthly.toLocaleString()}/mo
            </div>
          </div>
        ))}
        <div className="flex items-baseline justify-between pt-5 mt-3 border-t-2 border-copper">
          <div className="font-serif text-2xl font-semibold text-forest">Total · 90 days</div>
          <div className="font-serif text-3xl font-semibold text-copper">
            ${total.toLocaleString()}
          </div>
        </div>
        <div className="text-center text-xs text-muted mt-4">
          Even monthly cadence. No upfront payment.
        </div>
      </div>
    </div>
  )
}
