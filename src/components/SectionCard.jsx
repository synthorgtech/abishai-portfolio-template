// About section as a living card: a big index number, a peach heading, and a body that
// reveals line by line as it enters. The card tilts gently toward the cursor (3D) and
// lifts on hover. Keeps the two-column editorial rhythm but makes it tactile.
import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/gsap'

export function SectionCard({ index, title, children, id }) {
  const card = useRef(null)
  const body = useRef(null)

  useEffect(() => {
    const el = card.current
    if (!el || prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      // body reveals line by line on enter
      gsap.from(body.current.children, {
        y: 26,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: { trigger: el, start: 'top 78%' },
      })
      // cursor tilt (desktop pointers only)
      if (window.matchMedia('(pointer: fine)').matches) {
        const rotX = gsap.quickTo(el, 'rotationX', { duration: 0.5, ease: 'power3' })
        const rotY = gsap.quickTo(el, 'rotationY', { duration: 0.5, ease: 'power3' })
        const onMove = (e) => {
          const r = el.getBoundingClientRect()
          const px = (e.clientX - r.left) / r.width - 0.5
          const py = (e.clientY - r.top) / r.height - 0.5
          rotY(px * 6)
          rotX(-py * 6)
        }
        const onLeave = () => {
          rotX(0)
          rotY(0)
        }
        el.addEventListener('mousemove', onMove)
        el.addEventListener('mouseleave', onLeave)
        el.__cleanup = () => {
          el.removeEventListener('mousemove', onMove)
          el.removeEventListener('mouseleave', onLeave)
        }
      }
    }, el)
    return () => {
      el.__cleanup?.()
      ctx.revert()
    }
  }, [])

  return (
    <section id={id} className="scroll-mt-28 px-5 py-7 md:px-10 md:py-9" style={{ perspective: '1200px' }}>
      <div
        ref={card}
        className="group mx-auto grid max-w-[1600px] gap-8 rounded-[1.75rem] border border-ink/10 bg-white/55 p-7 shadow-[0_20px_60px_-40px_rgba(51,51,51,0.4)] backdrop-blur-sm transition-shadow duration-300 will-change-transform hover:shadow-[0_40px_90px_-45px_rgba(51,51,51,0.45)] md:grid-cols-2 md:gap-16 md:p-12 lg:p-16"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="md:pr-10 md:text-right">
          <span className="kinetic mb-2 block font-display text-5xl font-bold leading-none text-peach/35 md:text-7xl">
            {String(index).padStart(2, '0')}
          </span>
          <h2 className="font-display text-display-md font-bold text-peach">{title}</h2>
        </div>
        <div
          ref={body}
          className="max-w-xl space-y-5 font-body text-lg leading-relaxed text-ink/70"
        >
          {children}
        </div>
      </div>
    </section>
  )
}
