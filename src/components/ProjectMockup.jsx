// Premium project showcase, brand-art tiles (gradient mesh + dot-grid halftone
// + project wordmark + metrics). No faux UI. Two layouts:
//   variant="card"    → browser-framed single tile + caption (Home grid)
//   variant="gallery" → a hero tile plus a grid of smaller tiles that stretches
//                       down (Work page), minimal text lives beside/above it
// A real screenshot/video drops into project.media and replaces the brand art.
import { useEffect, useRef, useState } from 'react'
import { gsap, prefersReducedMotion } from '../lib/gsap'

function hexToRgba(hex, a) {
  const h = hex.replace('#', '')
  const n = parseInt(h.length === 3 ? h.split('').map((c) => c + c).join('') : h, 16)
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`
}

// Animated gradient mesh + dot-grid halftone. `seed` varies the composition.
function BrandArt({ accent, seed = 0 }) {
  const ref = useRef(null)
  useEffect(() => {
    if (prefersReducedMotion()) return
    const blobs = ref.current.querySelectorAll('.ba-blob')
    const tweens = []
    blobs.forEach((b, i) => {
      tweens.push(
        gsap.to(b, {
          xPercent: gsap.utils.random(-22, 22),
          yPercent: gsap.utils.random(-22, 22),
          scale: gsap.utils.random(0.85, 1.3),
          duration: gsap.utils.random(6, 10),
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: i * 0.4 + seed * 0.2,
        })
      )
    })
    return () => tweens.forEach((t) => t.kill())
  }, [seed])

  // shift blob positions by seed for variety across tiles
  const p = (a, b) => `${a + ((seed * 13) % 20) - 10}%`
  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <div className="ba-blob absolute h-2/3 w-2/3 rounded-full blur-3xl" style={{ left: p(8), top: '12%', background: hexToRgba(accent, 0.7) }} />
      <div className="ba-blob absolute h-1/2 w-1/2 rounded-full blur-3xl" style={{ right: '6%', top: '26%', background: 'rgba(255,188,149,0.6)' }} />
      <div className="ba-blob absolute h-1/2 w-1/2 rounded-full blur-3xl" style={{ bottom: '4%', left: '34%', background: hexToRgba(accent, 0.4) }} />
      {/* dot-grid halftone */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.16) 1px, transparent 1px)',
          backgroundSize: '13px 13px',
          maskImage: 'radial-gradient(120% 120% at 50% 40%, #000 35%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(120% 120% at 50% 40%, #000 35%, transparent 75%)',
        }}
      />
      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.35)]" />
    </div>
  )
}

// One art tile. `content` decides what overlays the art.
function Tile({ project, seed = 0, content = 'plain', className = '', rounded = 'rounded-xl' }) {
  const { name, blurb, accent = '#2E54FE', metrics = [], media, placeholder } = project
  const [mediaFailed, setMediaFailed] = useState(false)
  const showMedia = media && !mediaFailed

  return (
    <div className={`relative overflow-hidden bg-[var(--scene-tile)] ${rounded} ${className}`}>
      {showMedia ? (
        media.endsWith('.mp4') ? (
          <video src={media} autoPlay loop muted playsInline preload="metadata" className="absolute inset-0 h-full w-full object-cover" onError={() => setMediaFailed(true)} />
        ) : (
          <img src={media} alt={`${name} preview`} loading="lazy" className="absolute inset-0 h-full w-full object-cover" onError={() => setMediaFailed(true)} />
        )
      ) : (
        <BrandArt accent={accent} seed={seed} />
      )}

      {!showMedia && content === 'hero' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
          <span className="font-display text-[clamp(2rem,5vw,3.75rem)] font-bold leading-none text-cream drop-shadow-sm">
            {name}
          </span>
          {blurb && !placeholder && (
            <span className="mt-3 max-w-xs font-body text-sm text-cream/75">{blurb}</span>
          )}
        </div>
      )}
      {!showMedia && content === 'mark' && (
        <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
          <span className="font-display text-2xl font-bold text-cream/90">{name}</span>
        </div>
      )}
      {!showMedia && content?.startsWith?.('metric:') && (() => {
        const m = metrics[Number(content.split(':')[1])]
        if (!m) return null
        return (
          <div className="absolute inset-0 flex flex-col items-start justify-end p-5">
            <span className="font-display text-3xl font-bold text-cream">{m.value}</span>
            <span className="font-body text-xs uppercase tracking-widest text-cream/70">{m.label}</span>
          </div>
        )
      })()}
    </div>
  )
}

export function ProjectMockup({ project, className = '', variant = 'card', showCaption = true }) {
  const { name, blurb, tags = [], metrics = [], link, placeholder } = project

  if (variant === 'gallery') {
    // A hero tile + a grid of smaller tiles that stretches down.
    return (
      <div className={`space-y-3 ${className}`} data-cursor={link ? 'view' : undefined}>
        <Tile project={project} seed={1} content="hero" className="aspect-[16/10]" rounded="rounded-2xl" />
        <div className="grid grid-cols-3 gap-3">
          <Tile project={project} seed={2} content={metrics[0] ? 'metric:0' : 'plain'} className="aspect-square" />
          <Tile project={project} seed={3} content="mark" className="aspect-square" />
          <Tile project={project} seed={4} content={metrics[1] ? 'metric:1' : 'plain'} className="aspect-square" />
        </div>
      </div>
    )
  }

  // card (Home)
  return (
    <div className={className} data-cursor={link ? 'view' : undefined}>
      <div className="overflow-hidden rounded-2xl border border-ink/10 bg-cream/60 p-2 shadow-sm backdrop-blur-sm">
        <div className="flex items-center gap-1.5 px-2 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff6159]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-3 rounded-md bg-ink/5 px-3 py-0.5 font-display text-[11px] font-medium text-ink/50">
            {placeholder ? 'coming-soon' : `${name.toLowerCase().replace(/\s+/g, '')}.app`}
          </span>
        </div>
        <Tile project={project} seed={1} content="hero" className="aspect-[16/10]" />
      </div>

      {showCaption && (
        <>
          <div className="mt-4">
            <h3 className="font-display text-xl font-semibold text-ink">{name}</h3>
            {blurb && <p className="mt-1 max-w-sm font-body text-sm text-ink/60">{blurb}</p>}
          </div>
          {metrics.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
              {metrics.map((m, i) => (
                <div key={i} className="flex items-baseline gap-1.5">
                  <span className="font-display text-base font-bold text-peach">{m.value}</span>
                  <span className="font-body text-xs text-ink/55">{m.label}</span>
                </div>
              ))}
            </div>
          )}
          {tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {tags.map((t) => (
                <span key={t} className="rounded-full bg-ink/5 px-2.5 py-1 font-display text-[11px] font-semibold text-ink/70">
                  {t}
                </span>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
