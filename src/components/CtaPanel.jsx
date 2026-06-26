// Closing CTA panel (matches the reference): a large bordered panel with the
// headline up top and a bottom bar. Hovering the bottom "Let's talk" slides a panel
// up to reveal the email + a "Copy my Email" button; clicking copies it.
import { useState } from 'react'
import { FillHeadline } from './FillHeadline'
import { EMAIL } from '../data/socials'

export function CtaPanel() {
  const [revealed, setRevealed] = useState(false)
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      /* clipboard blocked */
    }
  }

  return (
    <section className="mx-auto max-w-[1600px] px-5 pb-16 md:px-10">
      <div className="relative flex min-h-[88vh] flex-col overflow-hidden rounded-[2rem] border border-ink/20">
        {/* headline */}
        <div className="flex-1 p-8 md:p-16">
          <FillHeadline as="h2" fill="ink" className="max-w-3xl text-display-lg font-bold">
            Let's build something people remember
          </FillHeadline>
          <p className="mt-6 max-w-md font-body text-lg text-ink/55">
            From idea to shipped product.
          </p>
        </div>

        {/* interactive "Let's talk" bar */}
        <div
          className="relative h-[26vh] min-h-[150px] cursor-pointer border-t border-ink/15"
          data-cursor="email"
          onMouseEnter={() => setRevealed(true)}
          onMouseLeave={() => setRevealed(false)}
          onClick={() => {
            setRevealed(true)
            copy()
          }}
        >
          {/* default: arrow + Let's talk */}
          <div className="flex h-full items-center justify-between px-8 md:px-16">
            <span className="text-4xl text-gray-warm md:text-5xl" aria-hidden="true">→</span>
            <span className="font-display text-[clamp(2.75rem,9vw,8rem)] font-bold leading-none text-gray-warm">
              Let's talk
            </span>
          </div>

          {/* reveal panel slides up (slow), email rises gently inside it */}
          <div
            className={`absolute inset-0 flex items-center justify-between gap-6 overflow-hidden bg-[var(--reveal-gray)] px-8 transition-transform duration-[900ms] ease-out-quart md:px-16 ${
              revealed ? 'translate-y-0' : 'translate-y-full'
            }`}
          >
            <span
              className={`truncate font-display text-[clamp(1.75rem,5.5vw,4.5rem)] font-bold leading-none text-peach transition-all duration-[900ms] ease-out-quart ${
                revealed ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: revealed ? '180ms' : '0ms' }}
            >
              {EMAIL}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation()
                copy()
              }}
              className="shrink-0 rounded-full bg-blue px-6 py-3 font-display text-base font-semibold text-cream transition-transform duration-300 ease-spring-pill hover:scale-105"
            >
              {copied ? 'Copied!' : 'Copy my Email'}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
