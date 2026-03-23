import { FaEnvelope, FaGithub, FaLinkedin, FaInstagram, FaFacebook, FaPhone } from 'react-icons/fa'
import { FaArrowUpRightFromSquare } from 'react-icons/fa6'
import { connectLinks } from '../data/portfolioData'
import SectionTitle from './SectionTitle'

function Icon({ kind }) {
  if (kind === 'github') return <FaGithub />
  if (kind === 'linkedin') return <FaLinkedin />
  if (kind === 'instagram') return <FaInstagram />
  if (kind === 'facebook') return <FaFacebook />
  if (kind === 'phone') return <FaPhone />
  return <FaEnvelope />
}

export default function ContactSection() {
  return (
    <section id="connect" className="section section--story">
      <div className="section-shell">
        <SectionTitle
          eyebrow="Connect"
          title="Contact and professional links"
          text="Direct contact information and external profiles related to projects, writeups, and technical work."
        />

        <div className="connect-intro glass-card">
          <span className="connect-intro__text">
            Open to internships, collaborations, and cybersecurity-related roles.
          </span>
        </div>

        <div className="connect-grid">
          {connectLinks.map((link, index) => (
            <a
              key={link.label}
              className="glass-card social-card"
              href={link.href}
              target={link.kind === 'mail' || link.kind === 'phone' ? '_self' : '_blank'}
              rel="noreferrer"
              style={{ transitionDelay: `${index * 60}ms` }}
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