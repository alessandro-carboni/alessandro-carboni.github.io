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
          text="Each project is framed as evidence of reasoning: analysis depth, experimentation, structured design, or the ability to move from idea to implementation."
          terminal
          terminalLabel="enumerate.projects"
        />

        <div className="projects-grid">
          {projects.map((project, index) => (
            <article
              className="glass-card project-card"
              key={project.title}
              data-reveal
              style={{ transitionDelay: `${index * 70}ms` }}
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

              <div className="card-terminal-chip">
                <span>&gt;</span>
                <span>status: documented</span>
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
    </section>
  )
}