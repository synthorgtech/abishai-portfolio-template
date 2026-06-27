// Brand logo: the name with a blue accent dot. Swap point - change the mark or
// the name here (or the colors in tokens.css) to rebrand the whole site.
import { Link } from 'react-router-dom'
import { site } from '../config/site'

export function Logo({ className = '' }) {
  return (
    <Link
      to="/"
      className={`flex items-center gap-1.5 font-display text-lg font-bold transition-transform duration-300 hover:scale-105 ${className}`}
    >
      <span>{site.firstName}</span>
      <span className="h-2 w-2 rounded-full bg-blue" aria-hidden="true" />
      <span>{site.lastName}</span>
    </Link>
  )
}

// The square "iii" mark used in the centered nav cluster. Swap the inner mark
// (text or a Lottie/SVG) to change the logo glyph.
export function LogoMark({ className = '' }) {
  return <span className={`font-display text-base font-bold italic text-blue ${className}`}>iii</span>
}
