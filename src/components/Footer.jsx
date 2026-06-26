// Footer = the full-screen closing scene (revealed as the page lifts; see App).
// Replicates the reference: a full-bleed avatar/desk VIDEO behind, the giant split
// name at the bottom, role + studio labels in the bottom corners, and a
// "Website made using" stack on the right. Drop your video at the path below.
import { useState } from 'react'
import { GradientScene } from './GradientScene'

// TODO: drop your avatar/desk video here and it fills the scene automatically.
const FOOTER_VIDEO = '/assets/video/desk-hero.mp4'

const STACK = ['Figma', 'React + Vite', 'GSAP', 'Lenis Scroll', 'Tailwind']

function SceneVideo() {
  const [failed, setFailed] = useState(false)
  return (
    <div className="absolute inset-0">
      {/* dark room stand-in (always behind) */}
      <GradientScene tone="warm" rounded="rounded-none" className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 bg-[#1b1410]/55" />
      {/* real video on top (hides if missing) */}
      {!failed && (
        <video
          src={FOOTER_VIDEO}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover"
          onError={() => setFailed(true)}
        />
      )}
      {failed && (
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-cream/30 px-5 py-2 font-display text-xs font-semibold uppercase tracking-widest text-cream/50">
          Your video here · drop {FOOTER_VIDEO}
        </span>
      )}
      {/* vignette for legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1b1410]/70 via-transparent to-[#1b1410]/40" />
    </div>
  )
}

export function Footer() {
  return (
    <footer className="relative h-full w-full overflow-hidden bg-[var(--scene-dark)] text-cream">
      <SceneVideo />

      {/* Website made using — right, mid */}
      <div className="absolute right-5 top-1/2 hidden -translate-y-1/2 text-right md:block md:right-10">
        <p className="text-sm text-cream/45">Website made using:</p>
        <ul className="mt-4 space-y-2.5 font-display text-sm font-semibold text-cream/90">
          {STACK.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </div>

      {/* giant name — centered & close together (split to the edges once a video is added) */}
      <div className="absolute inset-x-0 bottom-12 flex items-end justify-center gap-5 px-5 md:bottom-14 md:px-10">
        <h2 className="font-display text-[clamp(2.5rem,9vw,9rem)] font-bold leading-[0.8] text-peach">Abishai</h2>
        <h2 className="font-display text-[clamp(2.5rem,9vw,9rem)] font-bold leading-[0.8] text-peach">Gosula</h2>
      </div>

      {/* corner labels */}
      <div className="absolute inset-x-0 bottom-4 flex items-end justify-between px-5 font-display text-sm font-semibold md:px-10">
        <span className="text-cream/90">
          Founder &amp; Engineer <span className="text-cream/45">2026</span>
        </span>
        <span className="text-cream/90">
          Elsheph Systems <span className="text-cream/45">[Building]</span>
        </span>
      </div>
    </footer>
  )
}
