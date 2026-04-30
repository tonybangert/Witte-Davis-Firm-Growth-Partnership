// Section 6 quantifies the three benefit pillars introduced in Section 3.
// Each pillar has its own panel with a default conservative scenario and a
// short list of inputs Tony can tune live. Defaults aggregate to roughly
// $380k of Year 1 capacity recovered against a $36k engagement cost.

export const defaults = {
  attorneys: 2,
  weeksPerYear: 50,
  conversion: 0.5,
  hourlyRate: 625,

  // Pillar 1 inputs
  hoursRecoveredPerWeekPerAttorney: 4,

  // Pillar 2 inputs
  aploraQueriesPerWeek: 12,
  minutesSavedPerQuery: 35,

  // Pillar 3 inputs
  newMattersPerYear: 2,
  averageMatterValue: 75000
}

export const pillars = [
  {
    id: 'time',
    eyebrow: 'Pillar 1 of 3',
    title: 'Recovered Time',
    framing: 'Daily friction removed.',
    narration: 'Email triage. Time entry reconstruction. Note retrieval. Hours every week that never make it onto an invoice.',
    frictionCategories: [
      { label: 'Email triage',                 hoursPerWeekPerAtty: 1.6, color: '#B86F3D' },
      { label: 'Time entry reconstruction',    hoursPerWeekPerAtty: 1.4, color: '#3D6A8A' },
      { label: 'Note retrieval',               hoursPerWeekPerAtty: 1.0, color: '#8FA68E' }
    ],
    compute: (d) => {
      const hoursPerYear = d.hoursRecoveredPerWeekPerAttorney * d.attorneys * d.weeksPerYear
      const billableHours = hoursPerYear * d.conversion
      const value = billableHours * d.hourlyRate
      return { hoursPerYear, billableHours, value }
    },
    inputs: [
      { key: 'hoursRecoveredPerWeekPerAttorney', label: 'Hrs / wk / attorney', min: 2, max: 8, step: 0.5, format: (v) => `${v} hrs` },
      { key: 'conversion',                       label: 'Billable conversion', min: 0.3, max: 0.8, step: 0.05, format: (v) => `${Math.round(v * 100)}%` },
      { key: 'hourlyRate',                       label: 'Blended rate',         min: 500, max: 800, step: 25,  format: (v) => `$${v}` }
    ]
  },
  {
    id: 'aplora',
    eyebrow: 'Pillar 2 of 3',
    title: 'Aplora Legal',
    framing: 'Tuned to your practice.',
    narration: 'Every PFAS comparison, every multi-state lookup, every climate disclosure cross-check. Research that took an hour, defensible in 30 seconds.',
    compute: (d) => {
      const hoursPerYear = (d.aploraQueriesPerWeek * d.minutesSavedPerQuery / 60) * d.weeksPerYear
      const billableHours = hoursPerYear * d.conversion
      const value = billableHours * d.hourlyRate
      return { hoursPerYear, billableHours, value }
    },
    inputs: [
      { key: 'aploraQueriesPerWeek',  label: 'Queries / wk firm-wide', min: 5,  max: 30, step: 1, format: (v) => `${v}` },
      { key: 'minutesSavedPerQuery',  label: 'Min saved / query',      min: 15, max: 60, step: 5, format: (v) => `${v} min` }
    ]
  },
  {
    id: 'brand',
    eyebrow: 'Pillar 3 of 3',
    title: 'Brand and Engine',
    framing: 'Repositioned. Active.',
    narration: 'Thought leadership in print. Speaking opportunities surfaced. A referral system that compounds. The work that finds you instead of the work you chase.',
    compute: (d) => {
      const value = d.newMattersPerYear * d.averageMatterValue
      return { hoursPerYear: 0, billableHours: 0, value }
    },
    inputs: [
      { key: 'newMattersPerYear',     label: 'New matters originated', min: 0.5, max: 5,       step: 0.5,  format: (v) => `${v}` },
      { key: 'averageMatterValue',    label: 'Avg matter origination', min: 25000, max: 200000, step: 5000, format: (v) => `$${(v / 1000).toFixed(0)}k` }
    ]
  }
]
