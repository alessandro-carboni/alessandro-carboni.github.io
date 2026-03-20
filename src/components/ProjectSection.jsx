import { FaArrowRight, FaLaptopCode } from 'react-icons/fa'
import { projects } from '../data/portfolioData'
import SectionTitle from './SectionTitle'

export default function ProjectSection() {
  return (
    <section id="projects" className="section section--story">
      <div className="section-shell">
        <SectionTitle
          eyebrow="Projects"
          title="Built to demonstrate process, not just interest."
          text="Projects are also browsed horizontally to keep the reading rhythm consistent with the rest of the portfolio."
        />

        <div className="project-scroller-shell glass-card">
          <div className="project-scroller">
            {projects.map((project) => (
              <article className="glass-card project-card project-card--scroller" key={project.title}>
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

                <a href={project.link} target="_blank" rel="noreferrer" className="text-link project-card__fake-link">
                  Explore project <FaArrowRight />
                </a>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}