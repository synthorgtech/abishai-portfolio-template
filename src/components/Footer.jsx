// Footer = the full-screen closing scene (revealed as the page lifts; see App).
// A full-bleed scene behind, a centered avatar placeholder, and role/studio labels
// in the bottom corners. Drop your video at the path below.
import { useState } from 'react'
import { GradientScene } from './GradientScene'

// TODO: drop your avatar/desk video here and it fills the scene automatically.
const FOOTER_VIDEO = '/assets/video/desk-hero.mp4'

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

      {/* centered avatar placeholder — TODO: drop your avatar video/image here */}
      <div className="absolute inset-0 z-10 grid place-items-center px-5">
        <div className="grid aspect-[3/4] w-56 max-w-[60vw] place-items-center rounded-3xl border border-dashed border-cream/30 bg-cream/5 backdrop-blur-sm md:w-72">
          <span className="px-4 text-center font-display text-xs font-semibold uppercase tracking-widest text-cream/55">
            Avatar
            <br />
            drop your video / image
          </span>
        </div>
      </div>

      {/* corner labels */}
      <div className="absolute inset-x-0 bottom-24 flex items-end justify-between px-5 font-display text-sm font-semibold md:bottom-4 md:px-10">
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
