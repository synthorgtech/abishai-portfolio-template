// Reusable scroll-reveal. Wrap anything; it animates in when it enters the viewport.
// variant: 'up' | 'scale' | 'mask' | 'left' | 'right' | 'blur'
// stagger: if true, animates direct children in sequence instead of the element itself.
import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/gsap'

const FROM = {
  up: { y: 70, opacity: 0 },
  scale: { scale: 0.88, opacity: 0, transformOrigin: 'center' },
  mask: { clipPath: 'inset(100% 0% 0% 0%)', y: 40 },
  left: { x: -80, opacity: 0 },
  right: { x: 80, opacity: 0 },
  blur: { opacity: 0, filter: 'blur(14px)', y: 30 },
}

export function Reveal({
  as: Tag = 'div',
  variant = 'up',
  stagger = false,
  start = 'top 85%',
  className = '',
  children,
}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return
    const targets = stagger ? el.children : el
    const tween = gsap.from(targets, {
      ...FROM[variant],
      duration: variant === 'mask' ? 1.1 : 0.95,
      ease: variant === 'scale' ? 'back.out(1.4)' : 'power3.out',
      stagger: stagger ? 0.12 : 0,
      scrollTrigger: { trigger: el, start },
    })
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [variant, stagger, start])

  return (
    <Tag ref={ref} className={className} style={variant === 'mask' ? { willChange: 'clip-path' } : undefined}>
      {children}
    </Tag>
  )
}
