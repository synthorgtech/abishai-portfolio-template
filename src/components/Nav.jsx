// Top nav: logo left, social ICONS + a subtle résumé link right. The [About][iii][Work]
// cluster sits centered at the top on desktop and drops to a floating bar at the
// BOTTOM on mobile (matches the reference).
import { NavLink, Link, useLocation } from 'react-router-dom'
import { socials } from '../data/socials'
import { site } from '../config/site'
import { Logo, LogoMark } from './Logo'
import { SocialIcon } from './SocialIcon'

// Individual frosted-glass button. The label uses mix-blend so its color adapts to
// whatever background shows through the glass.
function PillLink({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          'rounded-full border px-4 py-2 font-display text-sm font-semibold backdrop-blur-md transition-transform duration-300 ease-spring-pill hover:scale-110',
          isActive ? 'border-transparent bg-ink/80 text-cream' : 'border-white/25 bg-white/15',
        ].join(' ')
      }
    >
      {({ isActive }) =>
        isActive ? children : <span className="text-white [mix-blend-mode:difference]">{children}</span>
      }
    </NavLink>
  )
}

export function Nav() {
  useLocation() // re-render on route change for active styling

  return (
    <>
      {/* top bar — name centered on mobile, name-left + socials-right on desktop.
          Bare text uses mix-blend so it stays readable over any background. */}
      <header className="pointer-events-none fixed inset-x-0 top-0 z-nav">
        <nav className="pointer-events-auto mx-auto flex max-w-[1600px] items-center justify-center px-5 py-4 md:justify-between md:px-10">
          <Logo className="text-white [mix-blend-mode:difference]" />

          {/* résumé + socials — hidden on phone */}
          <div className="hidden items-center gap-4 md:flex md:gap-5">
            <a
              href={site.resumeUrl}
              download
              className="flex items-center gap-1.5 font-display text-sm font-semibold text-white transition-transform [mix-blend-mode:difference] hover:-translate-y-0.5"
            >
              Résumé
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                <path d="M8 2v8M8 10L4.5 6.5M8 10l3.5-3.5M3 14h10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>

            <div className="flex items-center gap-3.5">
              {socials.map((s) => (
                <a
                  key={s.key}
                  href={s.href}
                  target={s.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noreferrer"
                  aria-label={s.name}
                  data-cursor={s.cursor || undefined}
                  className="text-white transition-transform duration-300 ease-spring-social [mix-blend-mode:difference] hover:-translate-y-0.5"
                >
                  <SocialIcon name={s.key} />
                </a>
              ))}
            </div>
          </div>
        </nav>
      </header>

      {/* center cluster — individual floating glass buttons; bottom on mobile, top on desktop */}
      <div className="pointer-events-auto fixed bottom-6 left-1/2 z-nav flex -translate-x-1/2 items-center gap-3 md:bottom-auto md:top-4 md:gap-2">
        <PillLink to="/about">About</PillLink>
        <Link
          to="/"
          aria-label="Home"
          className="grid h-10 w-10 place-items-center rounded-xl bg-white shadow-md transition-transform duration-300 ease-spring-pill hover:scale-110"
        >
          <LogoMark />
        </Link>
        <PillLink to="/work">Work</PillLink>
      </div>
    </>
  )
}
