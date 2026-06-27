# Abishai Gosula — Portfolio

A high-craft, animation-heavy personal portfolio for Abishai Gosula (AG). Three pages
(Home, Work, About) sharing a custom cursor, nav, and a reveal footer.

## Stack & why

**Vite + React + GSAP.** React (with React Router) gives clean component structure for
the three pages; GSAP + ScrollTrigger drive the scroll-scrubbed motion and reveals;
Framer Motion handles page transitions; Lenis drives the weighted smooth scroll; Tailwind
carries the design tokens. Vite builds a static `dist/` for trivial hosting.

| Library | Version | Role |
|---|---|---|
| react / react-dom | 18.3 | UI |
| react-router-dom | 6.30 | 3-page routing |
| gsap (+ ScrollTrigger, SplitText, CustomEase) | 3.13 | scroll motion / reveals |
| lenis | 1.3 | smooth scroll |
| motion (Framer Motion) | 11 | page transitions |
| lottie-react | 2.4 | optional vector marks |
| tailwindcss | 3.4 | design tokens / utilities |
| vite | 5.4 | build / dev |

## Run, build, deploy

```bash
npm install
npm run dev        # local dev → http://localhost:5173
npm run build      # static production build → dist/
npm run preview    # preview the production build
```

**Deploy (Vercel / any static host).** The build output is a static SPA in `dist/`.
- **Vercel:** import the repo (framework preset: **Vite**) — `vercel.json` already adds the
  SPA rewrite (`/(.*) → /index.html`). Then connect your domain in the Vercel dashboard.
- **Netlify / other:** publish `dist/`; SPA fallback is in `public/_redirects`.

## Swap points (everything is themeable)

| What | Where | How |
|---|---|---|
| **Theme / colors** | `src/styles/tokens.css` | Edit the palette + scene shades (CSS vars). Includes `--slate` (closing CTA text). These also power Tailwind (`bg-peach`, `text-ink`, …) via `tailwind.config.js`. |
| **Page backdrop** | `src/styles/tokens.css` + `index.css` | Default is flat `--cream`. An **opt-in** peach→white backdrop is wired up but OFF: `--surface-top` / `--surface-bottom` / `--page-surface` define it; enable by switching the `body` background to `var(--page-surface)` and adding the `.page-surface` class to the content sheets (App.jsx + Home.jsx). |
| **Display font** | `src/styles/tokens.css` (+ `index.html` font link) | `--font-display`; uncomment the `@font-face` to drop in "Goga". |
| **Identity** (name, email, résumé, role) | `src/config/site.js` | One file → updates nav, footer, cursor copy, CTA everywhere. |
| **Logo** | `src/components/Logo.jsx` | Swap the name render or the "iii" mark glyph. |
| **Socials** | `src/data/socials.js` | Links + icon keys (icons in `SocialIcon.jsx`). |
| **Projects** | `src/data/projects.js` | Work rows + Home stack (name, blurb, tags, metrics, accent, live link, media). |
| **Awards / writing** | `src/data/awards.js` | About page lists. |
| **Images / video / résumé PDF / Lottie** | `public/assets/…` | See `ASSETS.md` for every path, format, and where it's used. |

## Structure

```
src/
  config/site.js         # identity (swap to rebrand)
  styles/tokens.css      # theme tokens (swap to retheme) + index.css (global + .page-surface)
  lib/                   # gsap setup, Lenis hook, magnetic hook, touch hook
  data/                  # projects, awards, socials
  components/            # Cursor, Nav (adaptive color), Footer, Hero, WorkStack, CtaPanel,
                         # AboutHero, SectionCard, Timeline, KineticScroll, StatStrip, …
  pages/                 # Home, Work, About
public/assets/           # img / video / lottie / fonts (placeholders + real)
```

## Signature interactions

- **Custom cursor** (`Cursor.jsx`) — peach ball that morphs to a "Copy my Email" pill on
  email targets (click copies) and a "View" pill on project links. State is recomputed
  every mousemove, so it never sticks. Disabled on touch.
- **Two-tone scroll-fill headlines** (`FillHeadline.jsx`) — words fill gray→peach/ink,
  scrubbed by ScrollTrigger.
- **Folder stack** (`WorkStack.jsx`) — Selected work fans out; the active folder is driven
  by cursor X (clean left→right, no flicker).
- **Portfolio folder** (`FolderIcons.jsx`) — opens to reveal an "Awards & Certifications"
  file that links to the About awards section.
- **CTA reveal** (`CtaPanel.jsx`) — hovering "Let's talk" slides up the email + "Copy my Email".
- **Hero expose** (`Home.jsx`) — the hero is pinned (`sticky`) behind the content sheet, which
  lifts over it on scroll (the same "expose" move as the footer, mirrored at the top).
- **Perspective section** (`WhyMe.jsx`) — one full-bleed photo of AG; the kicker + headline
  reveal word by word, the divider line draws across, the photo drifts with the cursor, and the
  pinned column lifts on scroll so the fourth point + button appear. Single screen on mobile.
- **Reveal footer** (`App.jsx` + `Footer.jsx`) — the page lifts as a rounded sheet to expose
  the full-screen footer scene beneath, with the contact list on the left edge.
- **Adaptive nav** (`Nav.jsx`) — samples the background luminance behind the bar and flips the
  text/pills between dark and cream so they stay readable on any section.
- **About editorial hero** (`AboutHero.jsx`) — name + dossier + portrait card + a looping role
  marquee (kinetic skew on scroll).
- **Living cards** (`SectionCard.jsx`) — About's story sections are cards with an index, a 3D
  cursor tilt, and line-by-line body reveal on desktop; plain text on phones.
- **Animated data** (`Timeline.jsx`, `StatStrip.jsx`) — self-drawing timelines for
  Education/Awards; stat numbers count up inside drawing rings.
- **Kinetic scroll** (`KineticScroll.jsx`) — elements tagged `.kinetic` skew with scroll
  velocity and settle when idle.
- **Hobbies scrapbook** (`Hobbies.jsx`), **section reveals** (`Reveal.jsx`), magnetic buttons
  (`useMagnetic`), cursor-drifting blobs (`FloatingBlobs.jsx`), wave-on-hover links.

## Accessibility & performance

Respects `prefers-reduced-motion`, keyboard-navigable, focus states, alt text, lazy media,
debounced pointer handlers, and ScrollTrigger refresh on route change.
