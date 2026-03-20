import { FaCheckCircle } from 'react-icons/fa'
import { achievements } from '../data/portfolioData'
import SectionTitle from './SectionTitle'

export default function AchievementsSection() {
  return (
    <section className="section section--story" id="achievements">
      <div className="section-shell">
        <SectionTitle
          eyebrow="Selected Achievements"
          title="Short, concrete, and immediately scannable."
          text="This section is intentionally compact: a recruiter or technical reader should be able to extract your direction and proof-of-work in a few seconds."
          terminal
          terminalLabel="parse.highlights"
        />

        <div className="achievements-grid">
          {achievements.map((item, index) => (
            <article
              key={item.title}
              className="glass-card achievement-card"
              data-reveal
              style={{ transitionDelay: `${index * 70}ms` }}
            >
              <div className="achievement-card__icon">
                <FaCheckCircle />
              </div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}