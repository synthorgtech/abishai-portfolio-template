// Text whose characters do a staggered wave when an ancestor with `group/wave`
// is hovered. Pure CSS transitions (no keyframes). Use: wrap a parent in
// `group/wave` and drop <WaveText text="..." /> inside.
export function WaveText({ text, className = '' }) {
  return (
    <span className={`inline-flex ${className}`} aria-label={text}>
      {[...text].map((ch, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="inline-block transition-transform duration-300 ease-spring-pill group-hover/wave:-translate-y-1.5"
          style={{ transitionDelay: `${i * 35}ms` }}
        >
          {ch === ' ' ? ' ' : ch}
        </span>
      ))}
    </span>
  )
}
