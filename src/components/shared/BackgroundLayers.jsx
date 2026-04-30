// Decorative environmental data primitives. Topographic contours on cream
// surfaces, blueprint grid on dark surfaces. Very low opacity, never compete
// with foreground content.
export default function BackgroundLayers({ surface = 'cream' }) {
  if (surface === 'dark') {
    return (
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-forest" />
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.06]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="bp-grid" width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#F4EFE6" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#bp-grid)" />
        </svg>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 pointer-events-none">
      <div className="absolute inset-0 bg-bone" />
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.08]"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
      >
        {Array.from({ length: 14 }).map((_, i) => (
          <path
            key={i}
            d={`M 0 ${120 + i * 70} Q 480 ${80 + i * 70 + (i % 2 ? -30 : 30)}, 960 ${120 + i * 70} T 1920 ${120 + i * 70}`}
            fill="none"
            stroke="#1B3B2F"
            strokeWidth="1"
          />
        ))}
      </svg>
    </div>
  )
}
