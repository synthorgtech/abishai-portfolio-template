// Full-bleed gradient rings that expand to fill the screen as you scroll -
// the "scroll animation" beat on About (peach field with soft green/pink arcs).
// Pinned; scrub-scales the rings. Swap for assets/lottie/rings.json later.
import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/gsap'

export function RingScene() {
  const section = useRef(null)
  const rings = useRef(null)

  useEffect(() => {
    const sec = section.current
    if (!sec || prefersReducedMotion()) return
    const els = rings.current.querySelectorAll('.bleed-ring')
    const tl = gsap.timeline({
      scrollTrigger: { trigger: sec, start: 'top top', end: '+=140%', scrub: true, pin: true },
    })
    tl.fromTo(
      els,
      { scale: 0.25, opacity: 0.3 },
      { scale: 2.6, opacity: 0.9, ease: 'none', stagger: 0.05 },
      0
    )
    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, [])

  // soft concentric rings (transparent centers so they read as arcs, not discs)
  const colors = ['#FF9D6E', '#5BD6A8', '#FF8FB0', '#7AA8FF']
  return (
    <section ref={section} className="relative h-screen w-full overflow-hidden bg-[#FFD3AE]">
      <div ref={rings} className="absolute left-1/2 top-[58%] -translate-x-1/2 -translate-y-1/2">
        {colors.map((c, i) => (
          <div
            key={i}
            className="bleed-ring absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-xl"
            style={{
              width: `${78 - i * 16}vmin`,
              height: `${78 - i * 16}vmin`,
              background: `radial-gradient(circle, transparent 48%, ${c} 62%, ${c}00 82%)`,
              opacity: 0.7,
            }}
          />
        ))}
      </div>
      {/* faint label so it reads as intentional before real lottie */}
      <span className="absolute bottom-6 left-1/2 -translate-x-1/2 font-display text-xs uppercase tracking-[0.3em] text-ink/40">
        keep scrolling
      </span>
    </section>
  )
}
