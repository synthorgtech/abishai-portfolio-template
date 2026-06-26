// Central GSAP registration + brand CustomEases.
// Import { gsap, ScrollTrigger } from here so plugins are always registered.
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { CustomEase } from 'gsap/CustomEase'

gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase)

// JS-tween equivalents of the CSS spring beziers (see tokens.css).
// CustomEase.create is idempotent-ish but guard against double registration in HMR.
if (!CustomEase.get?.('springPill')) {
  CustomEase.create('springPill', '0.275, 2.254, 0.281, 0.996')
  CustomEase.create('springSocial', '0.292, 1.932, 0.281, 0.996')
  CustomEase.create('outQuart', '0.165, 0.84, 0.44, 1')
}

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export { gsap, ScrollTrigger, SplitText, CustomEase }
