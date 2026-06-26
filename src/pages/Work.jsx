// WORK, hero + sticky left-column project index + project rows.
// Rows carry Challenge / Services / Role columns, a year tag, service chips,
// and a "See it live" button. Data is verbatim from src/data/projects.js.
import { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/gsap'
import { projects } from '../data/projects'
import { FillHeadline } from '../components/FillHeadline'
import { SeeItLive } from '../components/SeeItLive'
import { FolderIcons } from '../components/FolderIcons'
import { ProjectMockup } from '../components/ProjectMockup'

function ProjectRow({ project, index, registerRef }) {
  const ref = useRef(null)
  useEffect(() => {
    registerRef(index, ref.current)
    const el = ref.current
    if (!el || prefersReducedMotion()) return
    const tween = gsap.from(el.querySelectorAll('.row-anim'), {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'outQuart',
      stagger: 0.08,
      scrollTrigger: { trigger: el, start: 'top 75%' },
    })
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [index])

  return (
    <article
      ref={ref}
      id={`project-${project.slug}`}
      data-index={index}
      className="scroll-mt-28 border-t border-ink/15 py-16 first:border-t-0"
    >
      {/* header */}
      <div className="row-anim mb-6 flex flex-wrap items-end justify-between gap-4">
        <div className="flex items-center gap-4">
          <h2 className="font-display text-display-md font-bold text-ink">{project.name}</h2>
          {project.year && (
            <span className="rounded-full bg-peach px-3 py-1 font-display text-sm font-semibold text-ink">
              {project.year}
            </span>
          )}
        </div>
        {!project.placeholder && <SeeItLive href={project.link} />}
      </div>

      {/* minimal detail columns */}
      <div className="row-anim mb-8 grid gap-6 border-y border-ink/10 py-6 sm:grid-cols-3">
        <div>
          <h3 className="mb-2 text-xs uppercase tracking-widest text-gray-warm">Challenge</h3>
          <p className="font-body text-sm text-ink/75">{project.challenge}</p>
        </div>
        <div>
          <h3 className="mb-2 text-xs uppercase tracking-widest text-gray-warm">Services</h3>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-blue/40 px-3 py-1 font-display text-xs font-semibold text-blue"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-2 text-xs uppercase tracking-widest text-gray-warm">Role</h3>
          <p className="font-display font-semibold text-ink">{project.role || 'Builder'}</p>
        </div>
      </div>

      {/* big gallery that stretches down */}
      <div className="row-anim">
        <ProjectMockup project={project} variant="gallery" showCaption={false} />
      </div>
    </article>
  )
}

export default function Work() {
  const [active, setActive] = useState(0)
  const rowEls = useRef([])
  const registerRef = (i, el) => (rowEls.current[i] = el)

  // If arriving with a #project-slug hash, scroll to that project.
  useEffect(() => {
    const slug = window.location.hash.replace('#project-', '')
    if (!slug) return
    const i = projects.findIndex((p) => p.slug === slug)
    if (i < 0) return
    const id = setTimeout(() => {
      const el = rowEls.current[i]
      if (!el) return
      if (window.__lenis) window.__lenis.scrollTo(el, { offset: -120 })
      else el.scrollIntoView()
    }, 300)
    return () => clearTimeout(id)
  }, [])

  // Track which project is in view for the sticky index.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number(e.target.dataset.index))
        })
      },
      { rootMargin: '-45% 0px -45% 0px' }
    )
    rowEls.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const goTo = (i) => {
    const el = rowEls.current[i]
    if (!el) return
    if (window.__lenis) window.__lenis.scrollTo(el, { offset: -120 })
    else el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* Hero */}
      <section className="mx-auto grid max-w-[1600px] items-center gap-10 px-5 pb-12 pt-36 md:grid-cols-[1fr_auto] md:px-10 md:pt-44">
        <FillHeadline as="h1" fill="ink" className="max-w-3xl text-display-lg font-bold">
          Passionate about the craft and the little details.
        </FillHeadline>
        <FolderIcons label="Work" fileTitle="Selected projects" fileName="work.md" to="/work" />
      </section>

      <section className="mx-auto grid max-w-[1600px] gap-10 px-5 pb-24 md:grid-cols-[200px_1fr] md:px-10">
        {/* Sticky index */}
        <aside className="hidden md:block">
          <nav className="sticky top-32 flex flex-col gap-3" aria-label="Project index">
            {projects.map((p, i) => (
              <button
                key={p.slug}
                onClick={() => goTo(i)}
                className="flex items-center gap-3 text-left font-display text-sm transition-colors"
              >
                <span
                  className={`h-2.5 w-2.5 shrink-0 rounded-full transition-all ${
                    active === i ? 'scale-125 bg-blue' : 'bg-ink/25'
                  }`}
                />
                <span className={active === i ? 'font-semibold text-ink' : 'text-ink/50'}>
                  {p.name}
                </span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Rows */}
        <div>
          {projects.map((p, i) => (
            <ProjectRow key={p.slug} project={p} index={i} registerRef={registerRef} />
          ))}
        </div>
      </section>
    </>
  )
}
