import { ned, heather, combination } from '../../data/credentials.js'

export default function Section2TheFirm({ step }) {
  return (
    <div className="w-full h-full grid grid-cols-2 gap-12 p-16">
      <div className="flex flex-col justify-center">
        <div className="font-mono text-[11px] uppercase tracking-widest text-copper mb-4">
          Section 2 · The Firm You Are Building
        </div>
        <h1 className="font-serif text-5xl font-semibold leading-tight text-forest">
          You are not building another firm.
        </h1>
        <h2 className="font-serif text-3xl font-medium mt-4 text-forest/80 leading-snug">
          You are building the firm that defines the regional PFAS market for
          the next decade.
        </h2>
      </div>

      <div className="flex flex-col justify-center gap-6">
        <Pillar
          visible={step >= 0}
          eyebrow="Ned · senior practitioner authority"
          items={ned.pillars}
        />
        <Pillar
          visible={step >= 1}
          eyebrow={`Heather · ${heather.states.join(' · ')}`}
          items={heather.pillars}
        />
        <Pillar
          visible={step >= 2}
          eyebrow="The combination"
          items={[combination.ned, combination.heather, combination.overlap]}
        />
      </div>
    </div>
  )
}

function Pillar({ visible, eyebrow, items }) {
  return (
    <div className={`border border-rule rounded-sm p-5 transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div className="font-mono text-[11px] uppercase tracking-widest text-copper mb-3">
        {eyebrow}
      </div>
      <ul className="space-y-1.5 text-sm text-ink">
        {items.map((it, i) => (
          <li key={i} className="flex gap-2">
            <span className="text-watershed">·</span>
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
