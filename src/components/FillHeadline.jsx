// Two-tone scroll-fill headline. Words start in --gray-warm and fill to the
// target color (default --peach) as they scroll into view, scrubbed by ScrollTrigger.
// Reusable: <FillHeadline as="h2" fill="ink">copy here</FillHeadline>
import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger, SplitText, prefersReducedMotion } from '../lib/gsap'

const COLORS = {
  peach: 'var(--peach)',
  ink: 'var(--ink)',
}

export function FillHeadline({ as: Tag = 'h2', fill = 'peach', className = '', children }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const target = COLORS[fill] || COLORS.peach

    if (prefersReducedMotion()) {
      el.style.color = target
      return
    }

    const split = new SplitText(el, { type: 'words', wordsClass: 'fh-word' })
    gsap.set(split.words, { color: 'var(--gray-warm)' })

    const tween = gsap.to(split.words, {
      color: target,
      ease: 'none',
      stagger: 0.5,
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        end: 'bottom 55%',
        scrub: true,
      },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
      split.revert()
    }
  }, [fill, children])

  return (
    <Tag ref={ref} className={`fill-headline font-display ${className}`}>
      {children}
    </Tag>
  )
}
