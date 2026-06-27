// Closing CTA - matches the reference: a peach section holding one bordered card.
// Slate headline + subline up top, a divider, then a bottom row with the arrow on the
// left and "Let's talk" on the right (same slate). Hovering "Let's talk" slides a
// panel up to reveal the email + a "Copy my Email" button; clicking copies it.
import { useState } from 'react'
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
    <section className="bg-[var(--peach)]">
      <div className="mx-auto max-w-[1600px] px-5 py-16 md:px-10 md:py-24">
        <div className="relative flex min-h-[58vh] flex-col overflow-hidden rounded-[1.75rem] border border-[var(--slate)]/30 md:min-h-[80vh]">
          {/* headline */}
          <div className="flex-1 p-7 md:p-16">
            <h2 className="max-w-3xl font-display text-[clamp(2.4rem,6vw,5.5rem)] font-bold leading-[1.02] text-[var(--slate)]">
              Let&apos;s build something people remember
            </h2>
            <p className="mt-5 max-w-md font-body text-base text-[var(--slate)]/70 md:mt-6 md:text-lg">
              From first idea to shipped product.
            </p>
          </div>

          {/* interactive "Let's talk" bar - arrow left, "Let's talk" right (slate) */}
          <div
            className="relative h-[19vh] min-h-[108px] cursor-pointer border-t border-[var(--slate)]/25 md:h-[24vh] md:min-h-[150px]"
            data-cursor="email"
            onMouseEnter={() => setRevealed(true)}
            onMouseLeave={() => setRevealed(false)}
            onClick={() => {
              setRevealed(true)
              copy()
            }}
          >
            <div className="flex h-full items-center justify-between px-7 md:px-16">
              <span className="text-3xl text-[var(--slate)] md:text-5xl" aria-hidden="true">
                →
              </span>
              <span className="font-display text-[clamp(2.25rem,8vw,6rem)] font-bold leading-none text-[var(--slate)]">
                Let&apos;s talk
              </span>
            </div>

            {/* reveal panel slides up (slow), email rises gently inside it */}
            <div
              className={`absolute inset-0 flex items-center justify-between gap-4 overflow-hidden bg-[var(--slate)] px-7 transition-transform duration-[900ms] ease-out-quart md:px-16 ${
                revealed ? 'translate-y-0' : 'translate-y-full'
              }`}
            >
              <span
                className={`truncate font-display text-[clamp(1.35rem,5vw,4.5rem)] font-bold leading-none text-cream transition-all duration-[900ms] ease-out-quart ${
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
                className="shrink-0 rounded-full bg-blue px-5 py-2.5 font-display text-sm font-semibold text-cream transition-transform duration-300 ease-spring-pill hover:scale-105 md:px-6 md:py-3 md:text-base"
              >
                {copied ? 'Copied!' : 'Copy my Email'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
