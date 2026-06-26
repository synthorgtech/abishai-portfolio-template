// HOME, light/cream. Calm structure with tasteful element-level micro-interactions
// (button waves, secret buttons, hover life) rather than heavy ambient motion.
// hero -> manifesto -> selected work (stack) -> tools/Portfolio folder ->
// "I sweat the details" parallax -> sharp instincts -> CTA -> footer (shared).
import { Link } from 'react-router-dom'
import { Hero } from '../components/Hero'
import { FillHeadline } from '../components/FillHeadline'
import { WorkStack } from '../components/WorkStack'
import { Reveal } from '../components/Reveal'
import { FolderIcons } from '../components/FolderIcons'
import { ParallaxImage } from '../components/ParallaxImage'
import { CheckList } from '../components/CheckList'
import { WaveText } from '../components/WaveText'
import { FloatingBlobs } from '../components/FloatingBlobs'
import { CtaPanel } from '../components/CtaPanel'

// Leadership-forward strengths (one technical nod, not a tech dump).
const STRENGTHS = [
  'Leads teams and owns the outcome',
  'Turns ambiguity into shipped products',
  'Moves fast and sweats the details',
  'Computer-science depth when it counts',
]

export default function Home() {
  return (
    <>
      {/* 1, hero (name) */}
      <Hero />

      {/* 2, personal headline with floating blobs (reference-style) */}
      <section className="relative flex min-h-screen flex-col items-center overflow-hidden px-5 pt-28 text-center md:pt-36">
        <div className="relative z-10 max-w-3xl">
          <Reveal variant="mask">
            <h2 className="font-display text-[clamp(2.25rem,5.5vw,4.5rem)] font-bold leading-[1.05] text-gray-warm">
              20 years old, building products and{' '}
              <span className="inline-block rounded-full bg-peach px-4 pb-1 pt-0.5 text-ink">leading</span>{' '}
              the people behind them.
            </h2>
          </Reveal>
          <Reveal variant="up">
            <p className="mx-auto mt-7 max-w-md font-body text-lg text-ink/65">
              Founder and computer-science student. I care more about shipping and leading than
              about the stack.
            </p>
          </Reveal>
        </div>
        <FloatingBlobs className="absolute inset-x-0 bottom-0 top-[42%] z-0" />
      </section>

      {/* 3, selected work (folder stack) */}
      <section className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-28">
        <div className="mb-12 flex items-end justify-between gap-4">
          <Reveal variant="mask">
            <h3 className="font-display text-display-md font-bold text-ink">Selected work</h3>
          </Reveal>
          <Reveal variant="right">
            <Link
              to="/work"
              data-cursor="view"
              className="group/wave inline-flex items-center gap-2 font-display text-sm font-semibold text-ink"
            >
              <WaveText text="View all work" />
              <span className="transition-transform duration-300 ease-spring-pill group-hover/wave:translate-x-1">→</span>
            </Link>
          </Reveal>
        </div>
        <WorkStack />
      </section>

      {/* 4, recognition / Portfolio folder */}
      <section className="mx-auto max-w-[1600px] px-5 py-28 md:px-10 md:py-40">
        <div className="grid items-center gap-16 md:grid-cols-2">
          <div>
            <Reveal variant="mask">
              <FillHeadline as="h2" fill="peach" className="text-display-md font-bold">
                Recognized for the work.
              </FillHeadline>
            </Reveal>
            <Reveal variant="up">
              <p className="mt-6 max-w-md font-body text-lg text-ink/70">
                Awards, fellowships, and shipped products. Open the folder.
              </p>
            </Reveal>
          </div>
          <Reveal variant="scale">
            <FolderIcons label="Portfolio" fileTitle="Awards & Certifications" to="/about#awards" />
          </Reveal>
        </div>
      </section>

      {/* 5, "I sweat the details" over a photo (parallax) */}
      <section className="relative mx-auto max-w-[1600px] px-5 md:px-10">
        <ParallaxImage
          src="/assets/img/desk-photo.jpg"
          alt="Abishai at his desk"
          label="DESK PHOTO · drop desk-photo.jpg"
          className="h-[70vh] min-h-[460px]"
        />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-6 text-center">
          <Reveal variant="scale">
            <FillHeadline as="h2" fill="peach" className="max-w-3xl text-display-lg font-bold drop-shadow">
              I sweat the details.
            </FillHeadline>
          </Reveal>
        </div>
      </section>

      {/* 6, sharp instincts */}
      <section className="mx-auto max-w-[1600px] px-5 py-28 md:px-10 md:py-40">
        <div className="grid gap-16 md:grid-cols-2">
          <Reveal variant="mask">
            <h2 className="font-display text-display-md font-bold text-ink">Sharp instincts.</h2>
          </Reveal>
          <CheckList items={STRENGTHS} />
        </div>
      </section>

      {/* 7, CTA panel with hover-to-reveal email */}
      <CtaPanel />
    </>
  )
}
