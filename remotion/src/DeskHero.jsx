import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { C, FONT } from './palette';

// A dim desk/room scene that warms up and dims back down over a seamless loop —
// matching the "dark room brightens" hero direction. Abstract & on-brand (no real
// avatar). The site's lighting overlay sits on top of this. Swap point: this becomes
// desk-hero.mp4.
export const DeskHero = () => {
  const frame = useCurrentFrame();
  const { durationInFrames, width, height } = useVideoConfig();
  // triangle wave 0->1->0 so the loop is seamless
  const t = frame / durationInFrames;
  const warm = Math.sin(t * Math.PI); // 0 at ends, 1 in middle

  const glow = interpolate(warm, [0, 1], [0.12, 0.6]);
  const lift = interpolate(warm, [0, 1], [0.85, 0.35]); // dark veil opacity

  // floating dust motes
  const motes = Array.from({ length: 18 }, (_, i) => {
    const seed = i * 97.13;
    const x = (Math.sin(seed) * 0.5 + 0.5) * width;
    const baseY = (Math.cos(seed * 1.7) * 0.5 + 0.5) * height;
    const drift = Math.sin(t * Math.PI * 2 + i) * 40;
    const op = (Math.sin(t * Math.PI * 2 + i * 0.6) * 0.5 + 0.5) * 0.5 * warm;
    return { x, y: baseY + drift, r: 2 + (i % 3), op };
  });

  return (
    <AbsoluteFill style={{ backgroundColor: C.dark }}>
      {/* warm key light rising from lower-right */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(60% 55% at 68% 70%, rgba(255,188,149,${glow}) 0%, rgba(255,188,149,0) 60%)`,
        }}
      />
      {/* desk silhouette */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: '34%',
          background: `linear-gradient(180deg, rgba(0,0,0,0) 0%, ${C.dark} 60%)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: '12%',
          right: '12%',
          bottom: '18%',
          height: 14,
          borderRadius: 8,
          background: `rgba(255,188,149,${glow * 0.6})`,
          filter: 'blur(2px)',
        }}
      />
      {/* monitor glow */}
      <div
        style={{
          position: 'absolute',
          left: '55%',
          bottom: '20%',
          width: '26%',
          height: '34%',
          borderRadius: 16,
          background: `linear-gradient(160deg, rgba(46,84,254,${glow * 0.5}), rgba(255,188,149,${glow * 0.4}))`,
          filter: 'blur(6px)',
        }}
      />
      {/* dust motes */}
      {motes.map((m, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: m.x,
            top: m.y,
            width: m.r,
            height: m.r,
            borderRadius: '50%',
            background: C.peachLite,
            opacity: m.op,
            filter: 'blur(0.5px)',
          }}
        />
      ))}
      {/* dark veil that lifts */}
      <AbsoluteFill style={{ backgroundColor: C.dark, opacity: lift }} />
      <AbsoluteFill
        style={{
          fontFamily: FONT,
          color: 'rgba(255,224,204,0.10)',
          fontSize: 28,
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          padding: 48,
          letterSpacing: 4,
          textTransform: 'uppercase',
        }}
      >
        placeholder scene
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
