// Top nav: logo left, social ICONS + a subtle résumé link right. The [About][iii][Work]
// cluster sits centered at the top on desktop and drops to a floating bar at the
// BOTTOM on mobile (matches the reference).
import { NavLink, Link, useLocation } from 'react-router-dom'
import { socials } from '../data/socials'
import { site } from '../config/site'
import { Logo, LogoMark } from './Logo'
import { SocialIcon } from './SocialIcon'

function PillLink({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          'rounded-full px-4 py-1.5 font-display text-sm font-semibold transition-transform duration-300 ease-spring-pill hover:scale-110',
          isActive ? 'bg-ink/80 text-cream' : 'text-ink',
        ].join(' ')
      }
      style={({ isActive }) => (isActive ? {} : { background: 'var(--pill-gray)' })}
    >
      {children}
    </NavLink>
  )
}

export function Nav() {
  useLocation() // re-render on route change for active styling

  return (
    <>
      {/* top bar */}
      <header className="pointer-events-none fixed inset-x-0 top-0 z-nav">
        <nav className="pointer-events-auto mx-auto flex max-w-[1600px] items-center justify-between px-5 py-4 md:px-10">
          <Logo className="text-ink" />

          <div className="flex items-center gap-4 md:gap-5">
            {/* subtle résumé */}
            <a
              href={site.resumeUrl}
              download
              className="hidden items-center gap-1.5 font-display text-sm font-semibold text-ink/70 transition-colors hover:text-ink sm:flex"
            >
              Résumé
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                <path d="M8 2v8M8 10L4.5 6.5M8 10l3.5-3.5M3 14h10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>

            {/* social icons */}
            <div className="flex items-center gap-3.5">
              {socials.map((s) => (
                <a
                  key={s.key}
                  href={s.href}
                  target={s.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noreferrer"
                  aria-label={s.name}
                  data-cursor={s.cursor || undefined}
                  className="text-ink transition-all duration-300 ease-spring-social hover:-translate-y-0.5 hover:text-blue"
                >
                  <SocialIcon name={s.key} />
                </a>
              ))}
            </div>
          </div>
        </nav>
      </header>

      {/* center cluster — top on desktop, floating bottom on mobile */}
      <div className="pointer-events-auto fixed bottom-6 left-1/2 z-nav flex -translate-x-1/2 items-center gap-2 rounded-full bg-cream/70 p-1.5 shadow-lg backdrop-blur md:bottom-auto md:top-4 md:bg-transparent md:p-0 md:shadow-none md:backdrop-blur-0">
        <PillLink to="/about">About</PillLink>
        <Link
          to="/"
          aria-label="Home"
          className="grid h-10 w-10 place-items-center rounded-xl bg-white shadow-sm transition-transform duration-300 ease-spring-pill hover:scale-110"
        >
          <LogoMark />
        </Link>
        <PillLink to="/work">Work</PillLink>
      </div>
    </>
  )
}
