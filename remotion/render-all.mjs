// Renders every placeholder asset into ../public/assets/.
// Run: npm run render  (from the remotion/ folder)  — or  npm run assets:render (root)
import { execSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';

const ENTRY = 'src/index.js';
const VIDEO_OUT = '../public/assets/video';
const IMG_OUT = '../public/assets/img';
mkdirSync(VIDEO_OUT, { recursive: true });
mkdirSync(IMG_OUT, { recursive: true });

const run = (cmd) => {
  console.log('\n> ' + cmd);
  execSync(cmd, { stdio: 'inherit' });
};

const videos = ['desk-hero', 'project-1', 'project-2', 'project-3', 'project-4', 'project-5', 'project-6'];

for (const id of videos) {
  run(`npx remotion render ${ENTRY} ${id} ${VIDEO_OUT}/${id}.mp4 --codec=h264`);
}

// Posters (stills) used before video loads.
run(`npx remotion still ${ENTRY} desk-hero ${IMG_OUT}/hero-poster.jpg --frame=120`);
run(`npx remotion still ${ENTRY} project-1 ${IMG_OUT}/video-loading.jpg --frame=90`);

console.log('\nAll assets rendered to public/assets/.');
