import { useMemo, useState } from 'react'
import { FaFlag, FaLock, FaSkullCrossbones, FaFilter } from 'react-icons/fa'
import { writeups, writeupFilters, getDifficultyStyles } from '../data/portfolioData'
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
            {filteredWriteups.map((item) => {
              const difficultyStyles = getDifficultyStyles(item.difficulty)

              return (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="writeup-card glass-card writeup-card--link flex flex-col"
                  key={item.title}
                >
                  <div className="writeup-card__meta">
                    <span className="pill">
                      <FaFlag />
                      {item.type}
                    </span>

                    <span
                      className="inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold border"
                      style={{
                        color:
                          item.difficulty === 'Easy'
                            ? '#15803d'
                            : item.difficulty === 'Medium'
                            ? '#c2410c'
                            : item.difficulty === 'Hard'
                            ? '#b91c1c'
                            : item.difficulty === 'Insane'
                            ? '#6d28d9'
                            : '#475569',
                        borderColor:
                          item.difficulty === 'Easy'
                            ? '#bbf7d0'
                            : item.difficulty === 'Medium'
                            ? '#fed7aa'
                            : item.difficulty === 'Hard'
                            ? '#fecaca'
                            : item.difficulty === 'Insane'
                            ? '#ddd6fe'
                            : '#e2e8f0',
                      }}
                    >
                      <FaSkullCrossbones style={{ marginRight: '0.45rem' }} />
                      <span>{item.difficulty}</span>
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

                  <div className="tag-cloud mt-auto">
                    {item.stack.map((tag) => (
                      <span className="tag" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}