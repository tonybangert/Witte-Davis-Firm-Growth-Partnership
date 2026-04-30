// Logo wordmark. Defaults to the supplied logo asset. The `tone` prop swaps to
// a typographic-only treatment for dark surfaces if needed.
export default function Wordmark({ size = 'md', className = '' }) {
  const heights = { sm: 'h-8', md: 'h-12', lg: 'h-20', xl: 'h-28' }
  return (
    <img
      src="/witte-davis-logo.png"
      alt="Witte Davis Law"
      className={`${heights[size] ?? heights.md} w-auto ${className}`}
    />
  )
}
