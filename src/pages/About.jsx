// ABOUT, replicates the reference flow:
//   1. centered landing headline (logo mark + dot + big grey type)
//   2. full-bleed gradient rings expand on scroll
//   3. full-bleed image is revealed
//   4. two-column sections (peach heading left / grey body right): Who I Am,
//      Approach, Philosophy, Community & Giving, Awards & Recognition, Writing
//   5. dark News & Updates feature card
//   6. Education footnote
import { useEffect } from 'react'
import { LottieMark } from '../components/LottieMark'
import { RingScene } from '../components/RingScene'
import { ParallaxImage } from '../components/ParallaxImage'
import { NewsFeature } from '../components/NewsFeature'
import { Hobbies } from '../components/Hobbies'
import { StatStrip } from '../components/StatStrip'
import { awards, writing } from '../data/awards'

// Two-column section: large peach heading (right-aligned in left col) + grey body.
function Section({ title, children, className = '', id }) {
  return (
    <section id={id} className={`scroll-mt-28 border-t border-ink/10 ${className}`}>
      <div className="mx-auto grid max-w-[1600px] gap-8 px-5 py-20 md:grid-cols-2 md:gap-16 md:px-10 md:py-28">
        <div className="md:pr-10 md:text-right">
          <h2 className="font-display text-display-md font-bold text-peach">{title}</h2>
        </div>
        <div className="max-w-xl space-y-5 font-body text-lg leading-relaxed text-ink/70">
          {children}
        </div>
      </div>
    </section>
  )
}

export default function About() {
  // If arrived via /about#awards (e.g. the Portfolio folder), scroll to that section.
  useEffect(() => {
    if (window.location.hash !== '#awards') return
    const id = setTimeout(() => {
      const el = document.getElementById('awards')
      if (!el) return
      if (window.__lenis) window.__lenis.scrollTo(el, { offset: -100 })
      else el.scrollIntoView()
    }, 400)
    return () => clearTimeout(id)
  }, [])

  return (
    <>
      {/* 1, centered landing headline */}
      <section className="grid min-h-screen place-items-center px-5 text-center">
        <h1 className="mx-auto max-w-5xl font-display text-[clamp(2.75rem,7vw,6.5rem)] font-bold leading-[0.98] text-gray-warm">
          <span className="mr-3 inline-grid h-[0.9em] w-[0.9em] translate-y-[0.08em] place-items-center rounded-2xl bg-white align-middle shadow-sm">
            <LottieMark
              src="/assets/lottie/logo-mark.json"
              className="h-[0.55em] w-[0.55em]"
              fallback={<span className="font-display text-[0.5em] font-bold italic text-blue">iii</span>}
            />
          </span>
          <span className="mr-3 inline-block h-[0.16em] w-[0.16em] translate-y-[-0.1em] rounded-full bg-blue align-middle" />
          Based in Hyderabad, working globally
        </h1>
      </section>

      {/* 2, gradient rings expand on scroll */}
      <RingScene />

      {/* 3, full-bleed image revealed */}
      <section className="px-3 md:px-5">
        {/* TODO: drop /assets/img/desk-photo.jpg to replace this designed scene */}
        <ParallaxImage
          src="/assets/img/desk-photo.jpg"
          alt="Abishai at his desk"
          label="DESK PHOTO · drop desk-photo.jpg"
          tone="warm"
          className="h-[88vh] min-h-[520px]"
        />
      </section>

      {/* stat strip */}
      <section className="mx-auto max-w-[1600px] px-5 py-16 md:px-10">
        <StatStrip
          stats={[
            { value: 5, suffix: '+', label: 'Ventures founded' },
            { value: 6, label: 'Racket sports played' },
            { value: 5, suffix: '+', label: 'Awards & honors' },
            { value: 3, label: 'Berkeley SkyDeck slots' },
          ]}
        />
      </section>

      {/* two-column sections, ordered: Who I Am, Approach, Education, Philosophy,
          Awards, Community, Writing — then Off the clock + closing card */}
      <Section title="Who I Am">
        <p>
          I’m Abishai Gosula, a Computer Science undergraduate and founder building at the
          intersection of AI, embedded vision, and software engineering.
        </p>
        <p>
          I’m an ex-competitive tennis athlete who plays six racket sports, and I’ve been shipping
          products since the beginning, exploring hardware, AI pipelines, and interfaces depending
          on what each problem actually needs.
        </p>
        <p>
          Now I’m building Elsheph Systems, a product studio behind ventures including synth, Benji,
          GMV Live, and Atlitos, creating work that feels useful, human, and built to last.
        </p>
      </Section>

      <Section title="Approach">
        <p>
          I start from the user’s eyes, then work from the inside out, understanding the product,
          the audience, and the real problem behind the brief.
        </p>
        <p>
          From there I build the whole thing: device, pipeline, and interface. My role isn’t just
          execution. It’s bringing clarity and shipping something that works better, not just looks
          better.
        </p>
      </Section>

      <Section title="Education">
        <ul className="flex flex-col">
          {[
            {
              school: 'SRM Institute of Science and Technology',
              detail: 'B.Tech, Computer Science and Engineering',
              year: '2023 – 2027',
            },
            {
              school: 'UC Berkeley',
              detail: 'Visiting Student, Startup Semester · Overall grade A+',
              year: '2026',
            },
          ].map((e, i) => (
            <li
              key={i}
              className="flex flex-col gap-1 border-b border-ink/10 py-5 first:pt-0 last:border-0 sm:flex-row sm:items-baseline sm:justify-between"
            >
              <div>
                <span className="block font-display font-semibold text-ink">{e.school}</span>
                <span className="block font-body text-sm text-ink/60">{e.detail}</span>
              </div>
              <span className="shrink-0 text-sm text-gray-warm">{e.year}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Philosophy">
        <p>
          I don’t chase trends. I use them when they make sense. The goal is always to build
          something distinctive, something people actually remember.
        </p>
        <p>Every project, whatever the size, deserves the same level of care.</p>
        <p>And faith keeps me grounded, and growth is part of who I am.</p>
      </Section>

      <Section title="Awards & Certifications" id="awards">
        <ul className="flex flex-col">
          {awards.map((a, i) => (
            <li
              key={i}
              className="flex flex-col gap-1 border-b border-ink/10 py-4 first:pt-0 last:border-0 sm:flex-row sm:items-baseline sm:justify-between"
            >
              <span className={`font-display font-semibold ${a.placeholder ? 'text-ink/40' : 'text-ink'}`}>
                {a.title}
              </span>
              <span className="shrink-0 text-sm text-gray-warm">
                {[a.org, a.year].filter(Boolean).join(' · ')}
              </span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Community & Giving">
        <p>
          Through Elsheph Systems, I train and employ young engineers from Andhra Pradesh, building
          a grassroots talent ecosystem in software and AI.
        </p>
        <ul className="flex flex-col gap-3 pt-2">
          {['Chairman, IEEE TEMS SRM Chapter', 'Secretary, LaunchPad SRM', 'ISF Junicorn Global Fellow'].map(
            (r) => (
              <li key={r} className="flex items-center gap-3 font-display font-semibold text-ink">
                <span className="h-1.5 w-1.5 rounded-full bg-peach" />
                {r}
              </li>
            )
          )}
        </ul>
      </Section>

      <Section title="Writing">
        <div className="grid gap-4 sm:grid-cols-1">
          {writing.map((post, i) => (
            <a
              key={i}
              href={post.href}
              target="_blank"
              rel="noreferrer"
              data-cursor="view"
              className={`group flex items-center justify-between gap-4 rounded-2xl border p-5 transition-transform duration-300 ease-spring-pill hover:scale-[1.02] ${
                post.placeholder ? 'border-dashed border-ink/20' : 'border-ink/10'
              }`}
            >
              <div>
                <span className="block text-xs uppercase tracking-widest text-gray-warm">{post.date}</span>
                <span className="font-display font-semibold text-ink">{post.title}</span>
              </div>
              <span className="font-display text-sm text-blue">Read →</span>
            </a>
          ))}
        </div>
      </Section>

      {/* Off the clock — hobbies gallery */}
      <Hobbies />

      {/* dark feature card — closing flourish */}
      <NewsFeature />
    </>
  )
}
