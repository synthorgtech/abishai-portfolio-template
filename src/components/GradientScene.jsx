// On-brand animated gradient scene used as a rich stand-in for big imagery
// (desk photo, about portrait) until a real photo is dropped in. Always renders.
import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/gsap'

export function GradientScene({ label, tone = 'warm', className = '', rounded = 'rounded-3xl' }) {
  const ref = useRef(null)
  useEffect(() => {
    if (prefersReducedMotion()) return
    const blobs = ref.current.querySelectorAll('.gs-blob')
    const tweens = []
    blobs.forEach((b, i) => {
      tweens.push(
        gsap.to(b, {
          xPercent: gsap.utils.random(-20, 20),
          yPercent: gsap.utils.random(-20, 20),
          scale: gsap.utils.random(0.9, 1.3),
          duration: gsap.utils.random(6, 10),
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: i * 0.5,
        })
      )
    })
    return () => tweens.forEach((t) => t.kill())
  }, [])

  const colors =
    tone === 'cool'
      ? ['#2E54FE', '#7A5CFF', '#FFBC95']
      : ['#FFBC95', '#FF9D6E', '#2E54FE']

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${rounded} ${className}`}
      style={{ background: tone === 'cool' ? 'var(--scene-cool)' : 'var(--scene-tile)' }}
      aria-hidden="true"
    >
      <div className="gs-blob absolute left-[10%] top-[10%] h-2/3 w-2/3 rounded-full blur-3xl" style={{ background: colors[0], opacity: 0.5 }} />
      <div className="gs-blob absolute right-[5%] top-[25%] h-1/2 w-1/2 rounded-full blur-3xl" style={{ background: colors[1], opacity: 0.45 }} />
      <div className="gs-blob absolute bottom-[5%] left-[35%] h-1/2 w-1/2 rounded-full blur-3xl" style={{ background: colors[2], opacity: 0.4 }} />
      {/* grain/soft vignette */}
      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.4)]" />
      {label && (
        <span className="absolute bottom-5 left-5 rounded-md bg-black/25 px-2.5 py-1 font-display text-[11px] font-semibold uppercase tracking-widest text-white/70 backdrop-blur">
          {label}
        </span>
      )}
    </div>
  )
}
