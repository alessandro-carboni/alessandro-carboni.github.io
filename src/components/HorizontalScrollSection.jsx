import { useEffect, useMemo, useRef, useState } from 'react'
import { FaArrowRight, FaFlag, FaLock, FaSkullCrossbones, FaFilter } from 'react-icons/fa'
import { writeups, writeupFilters } from '../data/portfolioData'
import SectionTitle from './SectionTitle'

export default function HorizontalScrollSection() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const viewportRef = useRef(null)
  const [activeFilter, setActiveFilter] = useState('All')

  const filteredWriteups = useMemo(() => {
    if (activeFilter === 'All') return writeups
    return writeups.filter((item) => item.category.includes(activeFilter))
  }, [activeFilter])

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    const viewport = viewportRef.current

    if (!section || !track || !viewport) return

    let ticking = false

    const setSectionHeight = () => {
      const maxTranslate = Math.max(track.scrollWidth - viewport.offsetWidth, 0)
      section.style.height = `${window.innerHeight + maxTranslate + 240}px`
    }

    const updateTrackPosition = () => {
      const rect = section.getBoundingClientRect()
      const maxTranslate = Math.max(track.scrollWidth - viewport.offsetWidth, 0)
      const scrollableDistance = section.offsetHeight - window.innerHeight

      let progress = 0

      if (scrollableDistance > 0) {
        progress = Math.min(Math.max(-rect.top / scrollableDistance, 0), 1)
      }

      const moveX = maxTranslate * progress
      track.style.transform = `translate3d(${-moveX}px, 0, 0)`
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateTrackPosition)
        ticking = true
      }
    }

    const onResize = () => {
      setSectionHeight()
      updateTrackPosition()
    }

    setSectionHeight()
    updateTrackPosition()

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [filteredWriteups])

  return (
    <section id="writeups" className="horizontal-section" ref={sectionRef}>
      <div className="horizontal-sticky">
        <div className="section-shell horizontal-shell">
          <SectionTitle
            eyebrow="CTF Writeups"
            title="Vertical scroll becomes lateral exploration."
            text="This section is intentionally built to slow the viewer down and make each writeup feel like a technical banner rather than just another card in a grid."
            terminal
            terminalLabel="browse.writeups"
          />

          <div className="writeup-filter-bar glass-card" data-reveal>
            <div className="writeup-filter-bar__label">
              <FaFilter />
              <span>Filter writeups</span>
            </div>

            <div className="writeup-filter-bar__chips">
              {writeupFilters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  className={`filter-chip ${activeFilter === filter ? 'is-active' : ''}`}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="horizontal-viewport" ref={viewportRef}>
            <div className="horizontal-track" ref={trackRef}>
              {filteredWriteups.map((item) => (
                <article className="writeup-card glass-card" key={item.title}>
                  <div className="writeup-card__meta">
                    <span className="pill">
                      <FaFlag />
                      {item.type}
                    </span>
                    <span className="difficulty">
                      <FaSkullCrossbones />
                      {item.difficulty}
                    </span>
                  </div>

                  <div className="writeup-card__title-row">
                    <span className="writeup-card__icon">
                      <FaLock />
                    </span>
                    <h3>{item.title}</h3>
                  </div>

                  <p>{item.summary}</p>

                  <div className="tag-cloud">
                    {item.stack.map((tag) => (
                      <span className="tag" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <a href={item.link} className="text-link" target="_blank" rel="noreferrer">
                    Read writeup <FaArrowRight />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}