// A vertical timeline: the peach line draws itself top-to-bottom as you scroll, and
// each node pops in with its row. Used for Education and Awards on About.
import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/gsap'

export function Timeline({ items = [] }) {
  const root = useRef(null)
  const line = useRef(null)

  useEffect(() => {
    const el = root.current
    if (!el || prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        line.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top 72%', end: 'bottom 75%', scrub: true },
        }
      )
      gsap.utils.toArray('.tl-item').forEach((it) => {
        gsap.from(it, {
          opacity: 0,
          x: 24,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: { trigger: it, start: 'top 88%' },
        })
        gsap.from(it.querySelector('.tl-dot'), {
          scale: 0,
          duration: 0.5,
          ease: 'back.out(2.2)',
          scrollTrigger: { trigger: it, start: 'top 88%' },
        })
      })
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={root} className="relative">
      {/* track + drawing fill */}
      <div className="absolute bottom-1 left-[11px] top-1 w-0.5 bg-ink/10" />
      <div ref={line} className="absolute bottom-1 left-[11px] top-1 w-0.5 origin-top bg-peach" />

      <ul className="flex flex-col gap-7">
        {items.map((it, i) => (
          <li key={i} className="tl-item relative pl-10">
            <span className="tl-dot absolute left-[4px] top-1 h-4 w-4 rounded-full border-2 border-cream bg-peach shadow-sm" />
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <div>
                <span className={`block font-display font-semibold ${it.placeholder ? 'text-ink/40' : 'text-ink'}`}>
                  {it.title}
                </span>
                {it.sub && <span className="block font-body text-sm text-ink/60">{it.sub}</span>}
              </div>
              {it.meta && <span className="shrink-0 text-sm text-gray-warm">{it.meta}</span>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
