import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa'
import { FaArrowUpRightFromSquare } from 'react-icons/fa6'
import { connectLinks } from '../data/portfolioData'
import SectionTitle from './SectionTitle'

function Icon({ kind }) {
  if (kind === 'github') return <FaGithub />
  if (kind === 'linkedin') return <FaLinkedin />
  return <FaEnvelope />
}

export default function ContactSection() {
  return (
    <section id="connect" className="section section--story">
      <div className="section-shell">
        <SectionTitle
          eyebrow="Connect"
          title="A dedicated contact zone — not a forgotten footer."
          text="This part is intentionally near the end, but still visually prominent. The idea is to keep the site focused on technical credibility first, then make contact paths clean and obvious."
          terminal
          terminalLabel="open.channels"
        />

        <div className="connect-intro glass-card" data-reveal>
          <span className="panel-terminal-line__prompt">$</span>
          <span className="connect-intro__text">
            Available for internships, research collaborations, and junior cybersecurity opportunities.
          </span>
        </div>

        <div className="connect-grid">
          {connectLinks.map((link, index) => (
            <a
              key={link.label}
              className="glass-card social-card"
              href={link.href}
              target={link.kind === 'mail' ? '_self' : '_blank'}
              rel="noreferrer"
              data-reveal
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <span className="social-icon">
                <Icon kind={link.kind} />
              </span>

              <div className="social-copy">
                <strong>{link.label}</strong>
                <span>{link.value}</span>
              </div>

              <span className="social-arrow">
                <FaArrowUpRightFromSquare />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}