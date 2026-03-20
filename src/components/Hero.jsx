import { useEffect, useRef } from 'react'
import {
  FaArrowRight,
  FaShieldAlt,
  FaBug,
  FaCodeBranch,
  FaUserSecret,
  FaDownload,
} from 'react-icons/fa'
import { rotatingRoles, stats, heroParagraph } from '../data/portfolioData'
import { useTypewriter } from '../hooks/useTypewriter'

const terminalCommands = [
  'PS C:\\> Get-Content profile.info',
  'C:\\> type profile.info',
  'user@host:~$ cat profile.info',
  'pwsh> gc .\\profile.info',
]

export default function Hero({ onPrimaryClick, onSecondaryClick }) {
  const typedRole = useTypewriter(rotatingRoles, 50, 22, 950)
  const typedCommand = useTypewriter(terminalCommands, 42, 24, 1050)
  const rootRef = useRef(null)

  const heroChips = [
    { label: 'Exploit Research', icon: <FaBug /> },
    { label: 'Security Tooling', icon: <FaCodeBranch /> },
    { label: 'Writeups', icon: <FaShieldAlt /> },
    { label: 'Reverse Engineering', icon: <FaUserSecret /> },
  ]

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    let rafId = null
    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0
    let scrollTarget = 0
    let scrollCurrent = 0

    const animate = () => {
      currentX += (targetX - currentX) * 0.08
      currentY += (targetY - currentY) * 0.08
      scrollCurrent += (scrollTarget - scrollCurrent) * 0.08

      root.style.setProperty('--mx', currentX.toFixed(4))
      root.style.setProperty('--my', currentY.toFixed(4))
      root.style.setProperty('--sy', scrollCurrent.toFixed(4))

      rafId = requestAnimationFrame(animate)
    }

    const handleMove = (event) => {
      const rect = root.getBoundingClientRect()
      const px = (event.clientX - rect.left) / rect.width
      const py = (event.clientY - rect.top) / rect.height

      targetX = (px - 0.5) * 2
      targetY = (py - 0.5) * 2
    }

    const handleLeave = () => {
      targetX = 0
      targetY = 0
    }

    const handleScroll = () => {
      const rect = root.getBoundingClientRect()
      const progress = Math.min(Math.max(-rect.top / window.innerHeight, 0), 1)
      scrollTarget = progress
    }

    handleScroll()
    rafId = requestAnimationFrame(animate)

    root.addEventListener('mousemove', handleMove)
    root.addEventListener('mouseleave', handleLeave)
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      root.removeEventListener('mousemove', handleMove)
      root.removeEventListener('mouseleave', handleLeave)
      window.removeEventListener('scroll', handleScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <section id="home" className="hero section hero-section" ref={rootRef}>
      <div className="hero-grid">
        <div className="hero-copy">
          <span className="hero-badge">Cybersecurity Portfolio</span>

          <h1>
            Alessandro Carboni
            <span className="hero-accent-line">Security work with depth, clarity, and technical rigor.</span>
          </h1>

          <div className="typing-line">
            <span className="typing-label">Focused on</span>
            <strong className="typing-word">
              {typedRole}
              <span className="typing-caret" />
            </strong>
          </div>

          <p className="hero-text">{heroParagraph}</p>

          <div className="hero-actions">
            <a
              href="/Alessandro-Carboni-CV.pdf"
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary"
            >
              Download CV <FaDownload />
            </a>

            <button type="button" className="btn btn-primary" onClick={onPrimaryClick}>
              Explore Writeups <FaArrowRight />
            </button>

            <button type="button" className="btn btn-primary" onClick={onSecondaryClick}>
              View Projects <FaArrowRight />
            </button>
          </div>
        </div>

        <div className="hero-panel glass-card hero-panel--parallax">
          <div className="hero-shell-mini">
            <span className="hero-shell-mini__text">{typedCommand}</span>
            <span className="hero-shell-mini__cursor" />
          </div>

          <div className="hero-profile">
            <div className="hero-profile__avatar-wrap">
              <div className="hero-profile__avatar-glow" />
              <img src="/profile.jpg" alt="Alessandro Carboni" className="hero-profile__avatar" />
            </div>

            <div className="hero-profile__meta">
              <h3>Alessandro Carboni</h3>
              <p>Cybersecurity student, builder, and hands-on security practitioner.</p>
            </div>
          </div>

          <div className="hero-panel__body">
            <div className="signal-block">
              <span className="signal-label">Current direction</span>
              <div className="signal-chip-row">
                {heroChips.map((chip) => (
                  <span className="signal-chip" key={chip.label}>
                    <span className="signal-chip__icon">{chip.icon}</span>
                    {chip.label}
                  </span>
                ))}
              </div>
            </div>

            <div className="hero-stats">
              {stats.map((stat) => (
                <article key={stat.label} className="stat-card">
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}