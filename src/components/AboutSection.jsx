import { FaBriefcase, FaGraduationCap, FaFlask } from 'react-icons/fa'
import { aboutHighlights, experienceTimeline } from '../data/portfolioData'
import SectionTitle from './SectionTitle'

const aboutIcons = [<FaBriefcase />, <FaGraduationCap />, <FaFlask />]

export default function AboutSection() {
  return (
    <section id="about" className="section section--story">
      <div className="section-shell">
        <SectionTitle
          eyebrow="Profile"
          title="Professional signal first. Technical depth right after."
          text="The opening experience is designed to communicate seriousness, clarity, and a real hands-on security background before the viewer even starts scrolling into the details."
          terminal
          terminalLabel="load.profile"
        />

        <div className="story-lead glass-card" data-reveal>
          <div className="story-lead__line" />
          <p>
            This portfolio is built as a guided read: immediate credibility first, technical detail second,
            and evidence of hands-on work throughout the scroll.
          </p>
        </div>

        <div className="about-grid">
          <div className="about-highlights">
            {aboutHighlights.map((item, index) => (
              <article className="glass-card info-card" key={item.title} data-reveal>
                <div className="info-card__icon">{aboutIcons[index]}</div>
                <div className="card-terminal-chip">
                  <span>&gt;</span>
                  <span>{item.title.toLowerCase().replace(/\s+/g, '_')}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>

          <div className="timeline-panel glass-card" data-reveal>
            <div className="timeline-panel__head">
              <span className="section-eyebrow">Experience Snapshot</span>
              <div className="panel-terminal-line">
                <span className="panel-terminal-line__prompt">$</span>
                <span className="panel-terminal-line__label">cat experience.log</span>
                <span className="panel-terminal-line__cursor" />
              </div>
              <h3>Selected experience</h3>
            </div>

            <div className="timeline">
              {experienceTimeline.map((item) => (
                <div key={`${item.year}-${item.title}`} className="timeline-item">
                  <div className="timeline-year">{item.year}</div>
                  <div className="timeline-content">
                    <h4>{item.title}</h4>
                    <span>{item.company}</span>
                    <p>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}