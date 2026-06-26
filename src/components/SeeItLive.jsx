// "See it live" button: gray pill + peach circular arrow badge that animates on hover.
export function SeeItLive({ href }) {
  const disabled = !href
  return (
    <a
      href={href || undefined}
      target={href ? '_blank' : undefined}
      rel="noreferrer"
      data-cursor={disabled ? undefined : 'view'}
      aria-disabled={disabled}
      className={`group inline-flex items-center gap-3 rounded-full py-2 pl-5 pr-2 font-display text-sm font-semibold transition-transform duration-300 ease-spring-pill ${
        disabled ? 'cursor-default opacity-50' : 'hover:scale-105'
      }`}
      style={{ background: 'var(--pill-gray)' }}
    >
      <span className="text-ink">{disabled ? 'Coming soon' : 'See it live'}</span>
      <span className="grid h-8 w-8 place-items-center rounded-full bg-peach transition-transform duration-300 ease-spring-pill group-hover:rotate-45">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path
            d="M3 13L13 3M13 3H5M13 3V11"
            stroke="#333333"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </a>
  )
}
