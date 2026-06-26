import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, random } from 'remotion';
import { C, FONT } from './palette';

// Abstract on-brand clip for a project thumbnail: drifting gradient blobs + the
// project name. Seamless loop. Swap point: each becomes project-N.mp4.
export const ProjectClip = ({ name = 'Project', accent = C.peach, seed = 1 }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const t = frame / durationInFrames;

  const blobs = Array.from({ length: 4 }, (_, i) => {
    const s = seed * 13.7 + i * 41.3;
    const cx = 30 + random(`x${s}`) * 40 + Math.sin(t * Math.PI * 2 + i) * 12;
    const cy = 30 + random(`y${s}`) * 40 + Math.cos(t * Math.PI * 2 + i * 1.3) * 12;
    const color = [C.peach, accent, C.blue, C.peachLite][i % 4];
    const size = 38 + (i % 3) * 14;
    return { cx, cy, size, color };
  });

  const titleOp = interpolate(Math.sin(t * Math.PI), [0, 1], [0.6, 1]);

  return (
    <AbsoluteFill style={{ backgroundColor: C.cream, overflow: 'hidden' }}>
      {blobs.map((b, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: `${b.cx}%`,
            top: `${b.cy}%`,
            width: `${b.size}%`,
            height: `${b.size}%`,
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
            background: b.color,
            opacity: 0.55,
            filter: 'blur(40px)',
            mixBlendMode: 'multiply',
          }}
        />
      ))}
      <AbsoluteFill
        style={{
          fontFamily: FONT,
          color: C.ink,
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          padding: 56,
        }}
      >
        <div style={{ fontSize: 26, letterSpacing: 3, textTransform: 'uppercase', opacity: 0.5 }}>
          Placeholder
        </div>
        <div style={{ fontSize: 84, fontWeight: 700, opacity: titleOp, lineHeight: 1 }}>{name}</div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
