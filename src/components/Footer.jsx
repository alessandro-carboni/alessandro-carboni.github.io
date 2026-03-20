import { FaArrowUp, FaFileAlt, FaShieldAlt, FaTerminal, FaDownload } from 'react-icons/fa'
import { footerReferences } from '../data/portfolioData'
import { useTypewriter } from '../hooks/useTypewriter'

export default function Footer() {
  const typedTitle = useTypewriter(
    ['Closing Signal', 'Final Section', 'End of Transmission'],
    60,
    30,
    1200,
  )

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <footer className="footer-section" id="footer">
      <div className="footer-section__glow" />
      <div className="footer-section__waves" aria-hidden="true">
        <span className="footer-wave footer-wave--one" />
        <span className="footer-wave footer-wave--two" />
        <span className="footer-wave footer-wave--three" />
      </div>

      <div className="section-shell footer-shell">
        <div className="footer-top glass-card" data-reveal>
          <div className="footer-top__intro">
            <span className="section-eyebrow">Final Note</span>

            <div className="footer-terminal-line">
              <span className="footer-terminal-line__prompt">$</span>
              <span className="footer-terminal-line__typed">{typedTitle}</span>
              <span className="footer-terminal-line__cursor" />
            </div>

            <h2>Built to leave a precise final impression.</h2>
            <p>
              This portfolio is designed to communicate technical credibility, hands-on security
              interest, and a clear growth direction across offensive and defensive cybersecurity.
            </p>

            <div className="footer-top__actions">
              <a
                href="/Alessandro-Carboni-CV.pdf"
                target="_blank"
                rel="noreferrer"
                className="footer-top__button"
              >
                <FaDownload />
                <span>Download CV</span>
              </a>

              <button type="button" className="footer-top__button footer-top__button--ghost" onClick={scrollTop}>
                <FaArrowUp />
                <span>Back to top</span>
              </button>
            </div>
          </div>
        </div>

        <div className="footer-grid">
          <article className="glass-card footer-card" data-reveal>
            <div className="footer-card__icon">
              <FaShieldAlt />
            </div>
            <h3>Portfolio Goal</h3>
            <p>
              Present a professional cybersecurity profile with enough technical detail to be
              credible, readable, and memorable.
            </p>
          </article>

          <article className="glass-card footer-card" data-reveal>
            <div className="footer-card__icon">
              <FaTerminal />
            </div>
            <h3>Reading Experience</h3>
            <p>
              Smooth flow, calm motion, subtle interaction, and progressive storytelling without
              compromising clarity or seriousness.
            </p>
          </article>

          <article className="glass-card footer-card" data-reveal>
            <div className="footer-card__icon">
              <FaFileAlt />
            </div>
            <h3>What Comes Next</h3>
            <p>
              Real writeups, project pages, deeper case studies, downloadable CV, and stronger
              technical references tied to actual work.
            </p>
          </article>
        </div>

        <div className="footer-references">
          {footerReferences.map((group, index) => (
            <div
              className="glass-card footer-reference-card"
              key={group.title}
              data-reveal
              style={{ transitionDelay: `${index * 90}ms` }}
            >
              <h4>{group.title}</h4>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-bottom" data-reveal>
          <span>Alessandro Carboni — Cybersecurity Portfolio</span>
          <span>Built with React, motion, and a security-first design language.</span>
        </div>
      </div>
    </footer>
  )
}