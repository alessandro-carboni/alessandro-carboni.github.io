import { useMemo, useState } from 'react'
import { FaFlag, FaLock, FaSkullCrossbones, FaFilter } from 'react-icons/fa'
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
          title="Selected technical writeups"
          text="Collection of CTF writeups documenting full exploitation paths, including enumeration, vulnerability discovery, exploitation, and privilege escalation."
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
              <a
                href={item.link}
                target="_blank"
                rel="noreferrer"
                className="writeup-card glass-card writeup-card--link"
                key={item.title}
              >
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
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="writeup-card__image"
                    />
                  )}

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
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}