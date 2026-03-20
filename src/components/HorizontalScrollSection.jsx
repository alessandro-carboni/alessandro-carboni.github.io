import { useMemo, useState } from 'react'
import { FaArrowRight, FaFlag, FaLock, FaSkullCrossbones, FaFilter } from 'react-icons/fa'
import { writeups, writeupFilters } from '../data/portfolioData'
import SectionTitle from './SectionTitle'

export default function HorizontalScrollSection() {
  const [activeFilter, setActiveFilter] = useState('All')

  const filteredWriteups = useMemo(() => {
    if (activeFilter === 'All') return writeups
    return writeups.filter((item) => item.category.includes(activeFilter))
  }, [activeFilter])

  return (
    <section id="writeups" className="section section--story">
      <div className="section-shell">
        <SectionTitle
          eyebrow="CTF Writeups"
          title="Browse writeups horizontally, without breaking normal page flow."
          text="The page keeps scrolling vertically as usual. Inside this box, writeups are browsed horizontally through the internal scrollbar or horizontal gestures."
        />

        <div className="writeup-filter-bar glass-card">
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

        <div className="writeup-scroller-shell glass-card">
          <div className="writeup-scroller">
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
    </section>
  )
}