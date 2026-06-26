// Hero — just the name, centered, on a coral→cream gradient that blends into the
// page below. Soft cream name with a blue brand dot; letters rise in on load; a
// faint glow follows the cursor. The personal headline lives in the section below.
import { useEffect, useRef } from 'react'
import { gsap, SplitText, prefersReducedMotion } from '../lib/gsap'

export function Hero() {
  const section = useRef(null)
  const glow = useRef(null)
  const l1 = useRef(null)
  const l2 = useRef(null)

  useEffect(() => {
    const sec = section.current
    if (!sec) return
    const ctx = gsap.context(() => {
      if (!prefersReducedMotion()) {
        const s1 = new SplitText(l1.current, { type: 'chars' })
        const s2 = new SplitText(l2.current, { type: 'chars' })
        gsap.set([...s1.chars, ...s2.chars], { yPercent: 120, opacity: 0 })
        const tl = gsap.timeline({ delay: 0.15 })
        tl.to(s1.chars, { yPercent: 0, opacity: 1, duration: 1, ease: 'back.out(1.5)', stagger: 0.05 })
        tl.to(s2.chars, { yPercent: 0, opacity: 1, duration: 1, ease: 'back.out(1.5)', stagger: 0.05 }, '-=0.8')
        tl.to('.hero-dot', { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2)' }, '-=0.3')
        tl.to('.hero-cue', { opacity: 1, duration: 0.6 }, '-=0.2')
      }

      const xTo = gsap.quickTo(glow.current, 'x', { duration: 0.7, ease: 'power3' })
      const yTo = gsap.quickTo(glow.current, 'y', { duration: 0.7, ease: 'power3' })
      let raf = 0
      const onMove = (e) => {
        const r = sec.getBoundingClientRect()
        if (!raf) raf = requestAnimationFrame(() => {
          xTo(e.clientX - r.left); yTo(e.clientY - r.top)
          gsap.to(glow.current, { opacity: 0.5, duration: 0.5 }); raf = 0
        })
      }
      sec.addEventListener('mousemove', onMove, { passive: true })
      sec.__cleanup = () => { sec.removeEventListener('mousemove', onMove); if (raf) cancelAnimationFrame(raf) }
    }, sec)
    return () => { sec.__cleanup?.(); ctx.revert() }
  }, [])

  return (
    <section
      ref={section}
      className="relative grid h-screen w-full place-items-center overflow-hidden"
      style={{ background: 'linear-gradient(180deg, var(--peach-deep) 0%, var(--peach-soft) 48%, var(--cream) 100%)' }}
    >
      <div ref={glow} className="pointer-events-none absolute -left-[260px] -top-[260px] h-[520px] w-[520px] rounded-full opacity-0" style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.5), transparent 65%)', filter: 'blur(20px)' }} aria-hidden="true" />

      <h1 className="relative z-10 select-none text-center font-display font-bold leading-[0.84] tracking-tight text-cream [text-shadow:0_1px_30px_rgba(0,0,0,0.06)]">
        <span ref={l1} className="block text-giant">Abishai</span>
        <span className="hero-dot mx-auto my-3 block h-3 w-3 origin-center scale-0 rounded-full bg-blue opacity-0 md:my-5 md:h-4 md:w-4" aria-hidden="true" />
        <span ref={l2} className="block text-giant">Gosula</span>
      </h1>

      <div className="hero-cue absolute bottom-8 left-1/2 z-10 -translate-x-1/2 opacity-0">
        <span className="flex flex-col items-center gap-2 text-cream/80">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <span className="h-8 w-px bg-gradient-to-b from-cream/70 to-transparent" />
        </span>
      </div>
    </section>
  )
}
