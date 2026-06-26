import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger, prefersReducedMotion } from './gsap'

// Initialise Lenis weighted/decelerated smooth scroll and wire it into the
// GSAP ticker + ScrollTrigger. Returns nothing; mounts once at the app root.
export function useLenis() {
  useEffect(() => {
    // Respect reduced-motion: skip smooth scroll entirely.
    if (prefersReducedMotion()) return

    const lenis = new Lenis({
      duration: 1.2, // weighted, decelerated feel
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
    })

    // Drive Lenis off the GSAP ticker for a single rAF loop.
    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    // expose for nav anchor scrolling
    window.__lenis = lenis

    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
      window.__lenis = null
    }
  }, [])
}
