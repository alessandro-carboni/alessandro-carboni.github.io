import { useEffect, useRef, useState } from 'react'
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

const TYPE_BASE = 28
const TYPE_PER_CHAR = 0.6
const DELETE_BASE = 16
const DELETE_PER_CHAR = 0.35
const HOLD_BASE = 850
const HOLD_PER_CHAR = 8

export default function Hero({ onPrimaryClick, onSecondaryClick }) {
  const typedRole = useTypewriter(rotatingRoles, 50, 22, 950)
  const [commandIndex, setCommandIndex] = useState(0)
  const [displayCommand, setDisplayCommand] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const rootRef = useRef(null)
  const measureRef = useRef(null)
  const [commandWidth, setCommandWidth] = useState(null)

  const heroChips = [
    { label: 'Exploit Research', icon: <FaBug /> },
    { label: 'Security Tooling', icon: <FaCodeBranch /> },
    { label: 'Writeups', icon: <FaShieldAlt /> },
    { label: 'Reverse Engineering', icon: <FaUserSecret /> },
  ]

  useEffect(() => {
    const current = terminalCommands[commandIndex]
    const typeDelay = Math.max(TYPE_BASE, TYPE_BASE + current.length * TYPE_PER_CHAR)
    const deleteDelay = Math.max(DELETE_BASE, DELETE_BASE + current.length * DELETE_PER_CHAR)
    const holdDelay = HOLD_BASE + current.length * HOLD_PER_CHAR

    let timeout

    if (!isDeleting && displayCommand.length < current.length) {
      timeout = setTimeout(() => {
        setDisplayCommand(current.slice(0, displayCommand.length + 1))
      }, typeDelay)
    } else if (!isDeleting && displayCommand.length === current.length) {
      timeout = setTimeout(() => {
        setIsDeleting(true)
      }, holdDelay)
    } else if (isDeleting && displayCommand.length > 0) {
      timeout = setTimeout(() => {
        setDisplayCommand(current.slice(0, displayCommand.length - 1))
      }, deleteDelay)
    } else if (isDeleting && displayCommand.length === 0) {
      timeout = setTimeout(() => {
        setIsDeleting(false)
        setCommandIndex((prev) => (prev + 1) % terminalCommands.length)
      }, 140)
    }

    return () => clearTimeout(timeout)
  }, [displayCommand, isDeleting, commandIndex])

  useEffect(() => {
    const measureNode = measureRef.current
    if (!measureNode) return

    measureNode.textContent = terminalCommands[commandIndex]
    const width = Math.ceil(measureNode.getBoundingClientRect().width)
    setCommandWidth(width)
  }, [commandIndex])

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
          <div
            className="hero-command"
            style={commandWidth ? { width: `calc(${commandWidth}px + 38px)` } : undefined}
          >
            <span className="hero-command__content">
              <span className="hero-command__text">{displayCommand}</span>
              <span className="hero-command__cursor" />
            </span>
            <span className="hero-command__measure" ref={measureRef} aria-hidden="true" />
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