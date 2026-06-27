// About landing hero. An editorial intro: status + location eyebrow, a big highlighted
// headline, a one-line intro, a résumé action, and a slowly rotating circular badge
// with the brand mark at its center. Everything rises in on load.
import { useEffect, useRef } from 'react'
import { gsap, SplitText, prefersReducedMotion } from '../lib/gsap'
import { site } from '../config/site'

function SpinBadge() {
  return (
    <div className="ah-badge relative mx-auto aspect-square w-36 md:w-full md:max-w-[300px]">
      <svg viewBox="0 0 200 200" className="h-full w-full" style={{ animation: 'spin 20s linear infinite' }}>
        <defs>
          <path id="ah-circle" d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" />
        </defs>
        <text className="fill-[var(--ink)]/55 font-display text-[13px] font-semibold uppercase tracking-[0.22em]">
          <textPath href="#ah-circle" startOffset="0">
            Founder · Engineer · CS student · Builder ·&nbsp;
          </textPath>
        </text>
      </svg>
      {/* brand mark in the center */}
      <span className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl bg-white shadow-md md:h-20 md:w-20">
        <span className="font-display text-2xl font-bold italic text-blue md:text-3xl">iii</span>
      </span>
    </div>
  )
}

export function AboutHero() {
  const root = useRef(null)
  const head = useRef(null)

  useEffect(() => {
    const el = root.current
    if (!el || prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      const split = new SplitText(head.current, { type: 'words' })
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.1 })
      tl.from('.ah-eyebrow', { y: 20, opacity: 0, duration: 0.6 })
        .from(split.words, { yPercent: 115, opacity: 0, duration: 0.8, stagger: 0.06 }, '-=0.2')
        .from('.ah-sub', { y: 24, opacity: 0, duration: 0.7 }, '-=0.5')
        .from('.ah-cta', { y: 20, opacity: 0, duration: 0.6 }, '-=0.45')
        .from('.ah-badge', { scale: 0.6, opacity: 0, rotate: -25, duration: 0.9, ease: 'back.out(1.5)' }, '-=0.8')
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} className="relative flex min-h-screen items-center overflow-hidden px-5 pb-28 pt-24 md:px-10 md:pb-0">
      {/* soft brand accents behind */}
      <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-peach/30 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-16 right-0 h-80 w-80 rounded-full bg-[var(--peach-tint)]/40 blur-3xl" aria-hidden="true" />

      <div className="relative z-10 mx-auto grid w-full max-w-[1500px] items-center gap-12 md:grid-cols-[1.4fr_0.6fr] md:gap-10">
        <div>
          {/* eyebrow: status + location */}
          <div className="ah-eyebrow flex flex-wrap items-center gap-3 font-display text-sm font-semibold">
            <span className="inline-flex items-center gap-2 rounded-full bg-ink/5 px-3 py-1.5 text-ink">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-blue" />
              </span>
              Open to building together
            </span>
            <span className="text-ink/45">{site.location}</span>
          </div>

          {/* headline */}
          <h1
            ref={head}
            className="mt-6 font-display text-[clamp(2.6rem,7.5vw,6.25rem)] font-bold leading-[0.95] text-ink"
          >
            Based in <span className="text-peach">Hyderabad</span>, working{' '}
            <span className="relative whitespace-nowrap text-peach">
              globally
              <svg className="absolute -bottom-2 left-0 w-full" height="12" viewBox="0 0 200 12" preserveAspectRatio="none" fill="none" aria-hidden="true">
                <path d="M2 8C40 3 160 3 198 8" stroke="var(--blue)" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </span>
            .
          </h1>

          {/* intro */}
          <p className="ah-sub mt-8 max-w-xl font-body text-lg leading-relaxed text-ink/65 md:text-xl">
            Founder and computer-science student. I build products end to end — and lead
            the people behind them.
          </p>

          {/* action + scroll cue */}
          <div className="ah-cta mt-9 flex flex-wrap items-center gap-6">
            <a
              href={site.resumeUrl}
              download
              className="group inline-flex items-center gap-3 rounded-full bg-ink px-6 py-3 font-display text-sm font-semibold text-cream transition-transform duration-300 ease-spring-pill hover:scale-105"
            >
              Download résumé
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="transition-transform duration-300 group-hover:translate-y-0.5">
                <path d="M8 2v8M8 10L4.5 6.5M8 10l3.5-3.5M3 14h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <span className="flex items-center gap-2 font-display text-xs font-semibold uppercase tracking-widest text-ink/45">
              Scroll
              <span className="h-px w-10 bg-ink/30" />
            </span>
          </div>
        </div>

        <SpinBadge />
      </div>
    </section>
  )
}
