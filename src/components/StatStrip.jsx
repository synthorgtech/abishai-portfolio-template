// Stat strip with count-up on scroll. Numbers animate from 0 when in view.
import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/gsap'

export function StatStrip({ stats = [] }) {
  const root = useRef(null)

  useEffect(() => {
    const el = root.current
    if (!el) return
    const nums = el.querySelectorAll('.stat-num')
    if (prefersReducedMotion()) {
      nums.forEach((n) => (n.textContent = n.dataset.to + (n.dataset.suffix || '')))
      return
    }
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        nums.forEach((n) => {
          const to = Number(n.dataset.to)
          const suffix = n.dataset.suffix || ''
          const obj = { v: 0 }
          gsap.to(obj, {
            v: to,
            duration: 1.4,
            ease: 'outQuart',
            onUpdate: () => (n.textContent = Math.round(obj.v) + suffix),
          })
        })
      },
    })
    return () => st.kill()
  }, [])

  return (
    <div ref={root} className="grid grid-cols-2 gap-6 sm:grid-cols-4">
      {stats.map((s, i) => (
        <div key={i} className="flex flex-col gap-1">
          <span className="font-display text-display-md font-bold text-peach">
            <span className="stat-num" data-to={s.value} data-suffix={s.suffix || ''}>
              0{s.suffix || ''}
            </span>
          </span>
          <span className="font-body text-sm text-ink/60">{s.label}</span>
        </div>
      ))}
    </div>
  )
}
