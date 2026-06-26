// Multi-part GSAP-driven custom cursor.
//   default state  -> 44px peach circle with a grey arrow ("ball")
//   data-cursor="email" -> blue pill reading "Copy my Email"; click copies the email
//   data-cursor="view"  -> blue pill reading "View"
// The container lerps toward the mouse (trailing lag). Disabled on touch devices.
import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import { EMAIL } from '../data/socials'
import { useIsTouch } from '../lib/useIsTouch'

const LABELS = {
  email: 'Copy my Email',
  view: 'View',
}

export function Cursor() {
  const isTouch = useIsTouch()
  const root = useRef(null)
  const ball = useRef(null)
  const pill = useRef(null)
  const pillText = useRef(null)
  const stateRef = useRef('default')

  useEffect(() => {
    if (isTouch) {
      document.documentElement.classList.remove('has-custom-cursor')
      return
    }
    document.documentElement.classList.add('has-custom-cursor')

    // quickTo gives a fast, near-instant follow with the faintest smoothing.
    const xTo = gsap.quickTo(root.current, 'x', { duration: 0.08, ease: 'power3' })
    const yTo = gsap.quickTo(root.current, 'y', { duration: 0.08, ease: 'power3' })

    let raf = 0
    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const onMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      // Recompute state from the element actually under the pointer every move,
      // so the cursor never gets "stuck" in a label state.
      const target = e.target.closest?.('[data-cursor]')
      setState(target ? target.getAttribute('data-cursor') : 'default')
      if (!raf) {
        raf = requestAnimationFrame(() => {
          xTo(mouse.x)
          yTo(mouse.y)
          raf = 0
        })
      }
    }

    const setState = (state) => {
      if (stateRef.current === state) return
      stateRef.current = state
      const isLabel = state === 'email' || state === 'view'
      if (isLabel) {
        if (pillText.current) pillText.current.textContent = LABELS[state]
        gsap.to(ball.current, { scale: 0, autoAlpha: 0, duration: 0.25, ease: 'springPill' })
        gsap.to(pill.current, { scale: 1, autoAlpha: 1, duration: 0.4, ease: 'springPill' })
      } else {
        gsap.to(pill.current, { scale: 0.4, autoAlpha: 0, duration: 0.25, ease: 'power2.out' })
        gsap.to(ball.current, { scale: 1, autoAlpha: 1, duration: 0.4, ease: 'springPill' })
      }
    }

    // Clicking while in the email state copies to clipboard + shows "Copied".
    const onClick = async () => {
      if (stateRef.current !== 'email') return
      try {
        await navigator.clipboard.writeText(EMAIL)
      } catch {
        /* clipboard may be blocked; ignore */
      }
      if (pillText.current) {
        const prev = pillText.current.textContent
        pillText.current.textContent = 'Copied'
        gsap.fromTo(
          pill.current,
          { scale: 1.15 },
          { scale: 1, duration: 0.5, ease: 'springPill' }
        )
        setTimeout(() => {
          if (pillText.current && stateRef.current === 'email') pillText.current.textContent = prev
        }, 1100)
      }
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('click', onClick)

    // initial state
    gsap.set(root.current, { x: mouse.x, y: mouse.y, autoAlpha: 1 })
    gsap.set(pill.current, { scale: 0.4, autoAlpha: 0 })

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('click', onClick)
      if (raf) cancelAnimationFrame(raf)
      document.documentElement.classList.remove('has-custom-cursor')
    }
  }, [isTouch])

  if (isTouch) return null

  return (
    <div
      ref={root}
      className="cursor-jm pointer-events-none fixed left-0 top-0 z-cursor"
      style={{ opacity: 0 }}
      aria-hidden="true"
    >
      {/* center the parts on the pointer */}
      <div className="-translate-x-1/2 -translate-y-1/2">
        {/* default ball */}
        <div
          ref={ball}
          className="cursor-jm-icon grid h-11 w-11 place-items-center rounded-[30px] bg-peach"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M3 13L13 3M13 3H5M13 3V11"
              stroke="#96908C"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        {/* label pill */}
        <div
          ref={pill}
          className="text-jm-cursor absolute left-0 top-0 whitespace-nowrap rounded-[20px] bg-blue px-3 py-2 font-display text-sm font-semibold text-peach"
        >
          <span ref={pillText}>Copy my Email</span>
        </div>
      </div>
    </div>
  )
}
