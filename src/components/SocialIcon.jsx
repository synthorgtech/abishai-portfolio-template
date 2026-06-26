// Illustrative icons for the social/contact links, selected by `name` key.
// currentColor-based so they inherit text color and hover states.
const PATHS = {
  email: (
    <>
      <rect x="2.5" y="4.5" width="15" height="11" rx="2.5" />
      <path d="M3.5 6l6.5 5 6.5-5" />
    </>
  ),
  linkedin: (
    <>
      <rect x="2.5" y="2.5" width="15" height="15" rx="3" />
      <path d="M6 8.5v5M6 6v.01M9.5 13.5v-3a1.5 1.5 0 0 1 3 0v3M9.5 8.5v5" />
    </>
  ),
  instagram: (
    <>
      <rect x="2.5" y="2.5" width="15" height="15" rx="4.5" />
      <circle cx="10" cy="10" r="3.5" />
      <path d="M14.3 5.7v.01" />
    </>
  ),
  youtube: (
    <>
      <rect x="2" y="4.5" width="16" height="11" rx="3.5" />
      <path d="M8.5 7.5l4 2.5-4 2.5z" fill="currentColor" stroke="none" />
    </>
  ),
  x: <path d="M4 4l12 12M16 4L4 16" />,
}

export function SocialIcon({ name, className = '' }) {
  return (
    <svg
      viewBox="0 0 20 20"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {PATHS[name] || null}
    </svg>
  )
}
