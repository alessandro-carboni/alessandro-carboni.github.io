import { FaArrowUp, FaFileAlt, FaShieldAlt, FaDownload } from 'react-icons/fa'
import { footerReferences } from '../data/portfolioData'

export default function Footer() {
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
        <div className="footer-top glass-card">
          <div className="footer-top__intro">
            <span className="section-eyebrow">Final Note</span>
            <h2>Technical portfolio focused on real work.</h2>
            <p>
              This portfolio collects practical cybersecurity work, including CTF writeups,
              exploitation chains, and projects related to web security, privilege escalation,
              and low-level analysis.
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
          <article className="glass-card footer-card">
            <div className="footer-card__icon">
              <FaShieldAlt />
            </div>
            <h3>Portfolio Content</h3>
            <p>
              Includes real exploitation paths, vulnerability analysis, and privilege escalation
              techniques derived from hands-on labs and CTF challenges.
            </p>
          </article>

          <article className="glass-card footer-card">
            <div className="footer-card__icon">
              <FaFileAlt />
            </div>
            <h3>Writeups</h3>
            <p>
              Each writeup documents the full attack chain: enumeration, vulnerability discovery,
              exploitation, and post-exploitation steps with a focus on root cause analysis.
            </p>
          </article>

          <article className="glass-card footer-card">
            <div className="footer-card__icon">
              <FaDownload />
            </div>
            <h3>Usage</h3>
            <p>
              The page is structured to provide direct access to technical material and supporting
              documentation without unnecessary navigation or filler content.
            </p>
          </article>
        </div>

        <div className="footer-references">
          {footerReferences.map((group) => (
            <div className="glass-card footer-reference-card" key={group.title}>
              <h4>{group.title}</h4>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <span>Alessandro Carboni — Cybersecurity Portfolio</span>
          <span>Focused on practical security work and technical writeups.</span>
        </div>
      </div>
    </footer>
  )
}