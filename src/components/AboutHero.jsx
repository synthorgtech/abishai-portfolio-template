// About landing hero. A pinned peach field (with soft drifting blobs) holding one bold
// statement; the page's content sheet lifts up and "uncovers" it on scroll, the same
// expose move as the home hero and the reveal footer. The words rise in on load.
import { useEffect, useRef } from 'react'
import { gsap, SplitText, prefersReducedMotion } from '../lib/gsap'
import { FloatingBlobs } from './FloatingBlobs'

export function AboutHero() {
  const root = useRef(null)
  const head = useRef(null)

  useEffect(() => {
    const el = root.current
    if (!el || prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      const split = new SplitText(head.current, { type: 'words' })
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.15 })
      tl.from('.ah-eyebrow', { y: 18, opacity: 0, duration: 0.6 })
        .from(split.words, { yPercent: 115, opacity: 0, duration: 0.9, stagger: 0.06 }, '-=0.2')
        .from('.ah-cue', { opacity: 0, duration: 0.6 }, '-=0.3')
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={root}
      className="relative grid h-screen w-full place-items-center overflow-hidden px-5 text-center"
      style={{ background: 'linear-gradient(180deg, var(--peach-deep) 0%, var(--peach-soft) 55%, var(--peach-tint) 100%)' }}
    >
      <FloatingBlobs className="absolute inset-0 z-0 opacity-80" />

      <div className="relative z-10 max-w-5xl">
        <span className="ah-eyebrow mx-auto mb-7 inline-flex items-center gap-2 rounded-full bg-cream/15 px-4 py-2 font-display text-sm font-semibold text-cream backdrop-blur">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-blue" />
          </span>
          Open to building together
        </span>

        <h1
          ref={head}
          className="font-display text-[clamp(2.75rem,8vw,7rem)] font-bold leading-[0.95] text-cream [text-shadow:0_2px_30px_rgba(0,0,0,0.1)]"
        >
          Based in Hyderabad,
          <br />
          working{' '}
          <span className="relative whitespace-nowrap">
            globally
            <svg className="absolute -bottom-2 left-0 w-full md:-bottom-3" height="14" viewBox="0 0 200 14" preserveAspectRatio="none" fill="none" aria-hidden="true">
              <path d="M3 9C42 4 158 4 197 9" stroke="var(--blue)" strokeWidth="4" strokeLinecap="round" />
            </svg>
          </span>
          .
        </h1>
      </div>

      <div className="ah-cue absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-cream/80">
        <span className="font-display text-xs uppercase tracking-widest">Scroll</span>
        <span className="h-8 w-px bg-gradient-to-b from-cream/70 to-transparent" />
      </div>
    </section>
  )
}
