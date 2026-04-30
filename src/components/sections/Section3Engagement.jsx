const PILLARS = [
  {
    title: 'Recovered Time',
    body: 'Daily friction removed. Hours returned to billable work, BD, or life.'
  },
  {
    title: 'Aplora Legal',
    body: 'A private AI platform tuned to your PFAS, multi-state, and climate disclosure practice.'
  },
  {
    title: 'Brand and Engine',
    body: 'Repositioned digital presence and an active business development rhythm.'
  }
]

export default function Section3Engagement({ step }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-16 gap-16">
      <div className="text-center max-w-4xl">
        <div className="font-mono text-[11px] uppercase tracking-widest text-copper mb-4">
          Section 3 · The Engagement
        </div>
        <h1 className="font-serif text-5xl font-semibold leading-tight text-forest">
          A 90-day embedded partnership designed to deliver three outcomes.
        </h1>
      </div>

      <div className="grid grid-cols-3 gap-8 max-w-6xl w-full">
        {PILLARS.map((p, i) => (
          <div
            key={p.title}
            className={`border-t-2 border-copper pt-6 transition-all duration-500 ease-deliberate ${
              step >= i ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: `${i * 120}ms` }}
          >
            <h3 className="font-serif text-2xl font-semibold text-forest mb-3">
              {p.title}
            </h3>
            <p className="text-ink/80 text-base leading-relaxed">{p.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
