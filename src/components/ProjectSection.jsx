import { FaLaptopCode } from 'react-icons/fa'
import { projects } from '../data/portfolioData'
import SectionTitle from './SectionTitle'

export default function ProjectSection() {
  return (
    <section id="projects" className="section section--story">
      <div className="section-shell">
        <SectionTitle
          eyebrow="Projects"
          title="Technical projects and labs"
          text="Collection of hands-on projects focused on security concepts, including web vulnerabilities, exploitation techniques, and custom tooling."
        />

        <div className="project-scroller-shell glass-card">
          <div className="project-scroller">
            {projects.map((project) => (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="glass-card project-card project-card--scroller project-card--link"
                key={project.title}
              >
                <div className="project-card__header">
                  <span className="project-line" />
                  <span className="project-subtitle">{project.subtitle}</span>
                </div>

                <div className="project-card__title-row">
                  <span className="project-card__icon">
                    <FaLaptopCode />
                  </span>
                  <h3>{project.title}</h3>
                </div>

                <p>{project.description}</p>

                <div className="tag-cloud">
                  {project.tags.map((tag) => (
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