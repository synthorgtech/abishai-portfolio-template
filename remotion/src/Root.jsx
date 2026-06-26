import { Composition } from 'remotion';
import { DeskHero } from './DeskHero';
import { ProjectClip } from './ProjectClip';
import { C } from './palette';

// Project clip names + accents, matching homeClips/projects in the site.
const CLIPS = [
  { id: 'project-1', name: 'synth', accent: C.blue },
  { id: 'project-2', name: 'Benji', accent: C.peach },
  { id: 'project-3', name: 'GMV Live', accent: C.blue },
  { id: 'project-4', name: 'Atlitos', accent: C.peach },
  { id: 'project-5', name: 'Project', accent: C.peachLite },
  { id: 'project-6', name: 'Project', accent: C.blue },
];

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="desk-hero"
        component={DeskHero}
        durationInFrames={240}
        fps={30}
        width={2050}
        height={1310}
      />
      {CLIPS.map((clip, i) => (
        <Composition
          key={clip.id}
          id={clip.id}
          component={ProjectClip}
          durationInFrames={180}
          fps={30}
          width={1200}
          height={900}
          defaultProps={{ name: clip.name, accent: clip.accent, seed: i + 1 }}
        />
      ))}
    </>
  );
};
