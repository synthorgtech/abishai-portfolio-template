// Checkmark list that staggers in on scroll. Each item's check draws on reveal.
import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/gsap'

export function CheckList({ items = [] }) {
  const root = useRef(null)

  useEffect(() => {
    const el = root.current
    if (!el || prefersReducedMotion()) return
    const rows = el.querySelectorAll('.check-row')
    const tween = gsap.from(rows, {
      x: -24,
      opacity: 0,
      duration: 0.7,
      ease: 'outQuart',
      stagger: 0.15,
      scrollTrigger: { trigger: el, start: 'top 78%' },
    })
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [])

  return (
    <ul ref={root} className="flex flex-col gap-5">
      {items.map((item, i) => (
        <li key={i} className="check-row flex items-center gap-4">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-peach">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M4 9.5L7.5 13L14 5.5"
                stroke="#333333"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="font-display text-lg font-medium text-ink md:text-xl">{item}</span>
        </li>
      ))}
    </ul>
  )
}
