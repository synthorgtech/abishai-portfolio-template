// Stat strip: each number counts up from 0 while a peach ring draws around it, when
// the strip scrolls into view.
import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/gsap'

const R = 46
const CIRC = 2 * Math.PI * R // ~289

export function StatStrip({ stats = [] }) {
  const root = useRef(null)

  useEffect(() => {
    const el = root.current
    if (!el) return
    const nums = el.querySelectorAll('.stat-num')
    const rings = el.querySelectorAll('.stat-ring')
    if (prefersReducedMotion()) {
      nums.forEach((n) => (n.textContent = n.dataset.to + (n.dataset.suffix || '')))
      rings.forEach((r) => (r.style.strokeDashoffset = CIRC * 0.12))
      return
    }
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 82%',
      once: true,
      onEnter: () => {
        nums.forEach((n) => {
          const to = Number(n.dataset.to)
          const suffix = n.dataset.suffix || ''
          const obj = { v: 0 }
          gsap.to(obj, {
            v: to,
            duration: 1.6,
            ease: 'power3.out',
            onUpdate: () => (n.textContent = Math.round(obj.v) + suffix),
          })
        })
        gsap.to(rings, {
          strokeDashoffset: CIRC * 0.12, // leave a small gap so it reads as a ring
          duration: 1.6,
          ease: 'power2.inOut',
          stagger: 0.08,
        })
      },
    })
    return () => st.kill()
  }, [])

  return (
    <div ref={root} className="grid grid-cols-2 gap-8 sm:grid-cols-4">
      {stats.map((s, i) => (
        <div key={i} className="flex flex-col items-start gap-3">
          <div className="relative grid h-24 w-24 place-items-center md:h-28 md:w-28">
            <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100" aria-hidden="true">
              <circle cx="50" cy="50" r={R} fill="none" stroke="var(--ink)" strokeOpacity="0.08" strokeWidth="2" />
              <circle
                className="stat-ring"
                cx="50"
                cy="50"
                r={R}
                fill="none"
                stroke="var(--peach)"
                strokeWidth="3"
                strokeLinecap="round"
                style={{ strokeDasharray: CIRC, strokeDashoffset: CIRC }}
              />
            </svg>
            <span
              className="stat-num font-display text-3xl font-bold text-peach md:text-4xl"
              data-to={s.value}
              data-suffix={s.suffix || ''}
            >
              0{s.suffix || ''}
            </span>
          </div>
          <span className="max-w-[8rem] font-body text-sm text-ink/60">{s.label}</span>
        </div>
      ))}
    </div>
  )
}
