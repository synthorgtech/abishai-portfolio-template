// Dark featured "card inside the website" (matches the reference's News & Updates
// / studio feature): kicker, big peach heading, body + Learn more, and a wide
// dotted card strip below. Reveals on scroll.
import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/gsap'

export function NewsFeature() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return
    const t = gsap.from(el.querySelectorAll('.nf-anim'), {
      y: 40,
      opacity: 0,
      duration: 0.9,
      ease: 'outQuart',
      stagger: 0.1,
      scrollTrigger: { trigger: el, start: 'top 75%' },
    })
    return () => {
      t.scrollTrigger?.kill()
      t.kill()
    }
  }, [])

  return (
    <section ref={ref} className="mx-auto max-w-[1600px] px-5 py-16 md:px-10">
      <div className="relative overflow-hidden rounded-[28px] bg-[var(--news-card)] px-6 py-12 text-cream md:px-14 md:py-16">
        {/* big watermark number */}
        <span className="pointer-events-none absolute right-8 top-6 font-display text-[120px] font-bold leading-none text-cream/5">
          01
        </span>

        <p className="nf-anim mb-10 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-peach">
          <span className="h-1.5 w-1.5 bg-peach" /> News &amp; Updates
        </p>

        <div className="grid gap-10 md:grid-cols-[1.1fr_1fr] md:items-center">
          <h2 className="nf-anim font-display text-display-md font-bold text-peach">
            Incubating ventures at Berkeley SkyDeck.
          </h2>
          <div className="nf-anim flex flex-col items-start gap-6">
            <p className="max-w-md font-body text-peach/80">
              synth and GMV Live were accepted to Berkeley SkyDeck Pad-13 and swept Collider Cup
              XVIII at UC Berkeley. New products are incubating now under Elsheph Systems.
            </p>
            <a
              href="https://www.linkedin.com/in/abishai-george-e-gosula/"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-3 rounded-full bg-cream/10 py-2 pl-5 pr-2 font-display text-sm font-semibold text-cream transition-transform duration-300 ease-spring-pill hover:scale-105"
            >
              Learn more
              <span className="grid h-8 w-8 place-items-center rounded-full bg-peach transition-transform duration-300 ease-spring-pill group-hover:rotate-45">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M3 13L13 3M13 3H5M13 3V11" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>
          </div>
        </div>

        {/* dotted card strip */}
        <div
          className="nf-anim mt-12 flex items-center justify-between rounded-2xl bg-cream px-6 py-10 font-display text-sm font-bold uppercase tracking-widest text-ink md:px-10"
          style={{
            backgroundImage: 'radial-gradient(rgba(51,51,51,0.12) 1px, transparent 1px)',
            backgroundSize: '14px 14px',
          }}
        >
          <span>Berkeley SkyDeck</span>
          <span className="hidden sm:inline">Pad-13</span>
          <span>2026</span>
        </div>
      </div>
    </section>
  )
}
