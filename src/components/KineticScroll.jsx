// Global "kinetic" motion: any element tagged `.kinetic` skews slightly with scroll
// velocity (fast scroll = more skew) and settles back to flat when you stop. Mounted
// once in App. Subtle by design so it reads as energy, not jank.
import { useEffect } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/gsap'

export function KineticScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return
    let idle
    const reset = () =>
      gsap.to('.kinetic', { skewY: 0, duration: 0.6, ease: 'power3', overwrite: 'auto' })

    const st = ScrollTrigger.create({
      onUpdate: (self) => {
        const skew = gsap.utils.clamp(-5, 5, self.getVelocity() / -380)
        gsap.to('.kinetic', { skewY: skew, duration: 0.5, ease: 'power3', overwrite: 'auto' })
        clearTimeout(idle)
        idle = setTimeout(reset, 140)
      },
    })
    return () => {
      st.kill()
      clearTimeout(idle)
    }
  }, [])
  return null
}
