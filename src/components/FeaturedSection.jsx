import { FaArrowRight, FaStar, FaBookOpen, FaFolderOpen } from 'react-icons/fa'
import SectionTitle from './SectionTitle'

export default function FeaturedSection({ featuredWriteup, featuredProject }) {
  return (
    <section className="section section--story" id="featured">
      <div className="section-shell">
        <SectionTitle
          eyebrow="Featured"
          title="A quick path to the strongest signal."
          text="The best portfolios reduce decision fatigue. This section gives immediate entry points to the most representative work."
          terminal
          terminalLabel="pin.featured"
        />

        <div className="featured-grid">
          <article className="glass-card featured-card featured-card--primary" data-reveal>
            <div className="featured-card__badge">
              <FaStar />
              <span>Featured Writeup</span>
            </div>

            <div className="featured-card__title">
              <span className="featured-card__icon">
                <FaBookOpen />
              </span>
              <h3>{featuredWriteup.title}</h3>
            </div>

            <p>{featuredWriteup.summary}</p>

            <div className="tag-cloud">
              {featuredWriteup.stack.map((tag) => (
                <span className="tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>

            <a href={featuredWriteup.link} target="_blank" rel="noreferrer" className="text-link">
              Open writeup <FaArrowRight />
            </a>
          </article>

          <article className="glass-card featured-card" data-reveal>
            <div className="featured-card__badge">
              <FaStar />
              <span>Featured Project</span>
            </div>

            <div className="featured-card__title">
              <span className="featured-card__icon">
                <FaFolderOpen />
              </span>
              <h3>{featuredProject.title}</h3>
            </div>

            <p>{featuredProject.description}</p>

            <div className="tag-cloud">
              {featuredProject.tags.map((tag) => (
                <span className="tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>

            <a href={featuredProject.link} target="_blank" rel="noreferrer" className="text-link">
              Explore project <FaArrowRight />
            </a>
          </article>
        </div>
      </div>
    </section>
  )
}