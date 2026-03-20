import { useRef } from 'react'
import { FaArrowRight, FaShieldAlt, FaBug, FaCodeBranch, FaUserSecret, FaDownload } from 'react-icons/fa'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { rotatingRoles, stats, heroParagraph } from '../data/portfolioData'
import { useTypewriter } from '../hooks/useTypewriter'

gsap.registerPlugin(useGSAP)

export default function Hero({ onPrimaryClick, onSecondaryClick }) {
  const typedRole = useTypewriter(rotatingRoles, 50, 22, 950)

  const rootRef = useRef(null)
  const copyRef = useRef(null)
  const panelRef = useRef(null)
  const avatarRef = useRef(null)
  const orbRef = useRef(null)
  const chipsRef = useRef([])
  const statsRef = useRef([])

  const heroChips = [
    { label: 'Exploit Research', icon: <FaBug /> },
    { label: 'Security Tooling', icon: <FaCodeBranch /> },
    { label: 'Writeups', icon: <FaShieldAlt /> },
    { label: 'Reverse Engineering', icon: <FaUserSecret /> },
  ]

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.fromTo(
        copyRef.current?.querySelectorAll('.hero-badge, h1, .typing-line, .hero-text, .hero-actions'),
        { y: 26, opacity: 0, filter: 'blur(6px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.9, stagger: 0.09 },
      )
        .fromTo(
          panelRef.current,
          { y: 34, opacity: 0, rotateY: -10, rotateX: 6, scale: 0.98 },
          { y: 0, opacity: 1, rotateY: -6, rotateX: 4, scale: 1, duration: 1.05 },
          '-=0.55',
        )
        .fromTo(
          avatarRef.current,
          { y: 14, opacity: 0, scale: 0.92 },
          { y: 0, opacity: 1, scale: 1, duration: 0.7 },
          '-=0.55',
        )
        .fromTo(
          chipsRef.current,
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55, stagger: 0.06 },
          '-=0.4',
        )
        .fromTo(
          statsRef.current,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55, stagger: 0.08 },
          '-=0.3',
        )

      const root = rootRef.current
      const panel = panelRef.current
      const orb = orbRef.current
      const avatar = avatarRef.current

      if (!root || !panel || !orb || !avatar) return

      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (prefersReduced) return

      let currentX = 0
      let currentY = 0
      let targetX = 0
      let targetY = 0
      let rafId = null

      const animate = () => {
        currentX += (targetX - currentX) * 0.09
        currentY += (targetY - currentY) * 0.09

        gsap.set(panel, {
          rotateY: -6 + currentX * 6,
          rotateX: 4 - currentY * 5,
          x: currentX * 10,
          y: currentY * 8,
          transformPerspective: 1500,
          transformOrigin: 'center center',
        })

        gsap.set(copyRef.current, {
          x: currentX * -6,
          y: currentY * -4,
        })

        gsap.set(avatar, {
          x: currentX * 8,
          y: currentY * 8,
        })

        gsap.set(orb, {
          x: currentX * 28,
          y: currentY * 28,
          opacity: 0.95,
        })

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
        gsap.to(orb, { opacity: 0.7, duration: 0.35, ease: 'power2.out' })
      }

      const handleEnter = () => {
        gsap.to(orb, { opacity: 0.95, duration: 0.25, ease: 'power2.out' })
      }

      const onScroll = () => {
        const rect = root.getBoundingClientRect()
        const progress = Math.min(Math.max(-rect.top / window.innerHeight, 0), 1)

        gsap.to(copyRef.current, {
          y: -progress * 26,
          duration: 0.35,
          ease: 'power2.out',
          overwrite: 'auto',
        })

        gsap.to(panel, {
          y: progress * 18,
          duration: 0.35,
          ease: 'power2.out',
          overwrite: 'auto',
        })

        gsap.to(orb, {
          y: progress * 30,
          duration: 0.35,
          ease: 'power2.out',
          overwrite: 'auto',
        })
      }

      root.addEventListener('mousemove', handleMove)
      root.addEventListener('mouseleave', handleLeave)
      root.addEventListener('mouseenter', handleEnter)
      window.addEventListener('scroll', onScroll, { passive: true })

      rafId = requestAnimationFrame(animate)

      return () => {
        root.removeEventListener('mousemove', handleMove)
        root.removeEventListener('mouseleave', handleLeave)
        root.removeEventListener('mouseenter', handleEnter)
        window.removeEventListener('scroll', onScroll)
        if (rafId) cancelAnimationFrame(rafId)
      }
    },
    { scope: rootRef },
  )

  return (
    <section id="home" className="hero section hero-section" ref={rootRef}>
      <div className="hero-grid">
        <div className="hero-copy" data-reveal ref={copyRef}>
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
            <button type="button" className="btn btn-primary" onClick={onPrimaryClick}>
              Explore Writeups <FaArrowRight />
            </button>

            <button type="button" className="btn btn-secondary" onClick={onSecondaryClick}>
              View Projects <FaArrowRight />
            </button>

            <a
              href="/Alessandro-Carboni-CV.pdf"
              target="_blank"
              rel="noreferrer"
              className="btn btn-secondary"
            >
              Download CV <FaDownload />
            </a>
          </div>
        </div>

        <div className="hero-panel glass-card" data-reveal ref={panelRef}>
          <div className="hero-panel__cursor-glow" ref={orbRef} />
          <div className="hero-panel__header">
            <span className="dot dot--cyan" />
            <span className="dot dot--violet" />
            <span className="dot dot--amber" />
          </div>

          <div className="hero-profile">
            <div className="hero-profile__avatar-wrap" ref={avatarRef}>
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
                {heroChips.map((chip, index) => (
                  <span
                    className="signal-chip"
                    key={chip.label}
                    ref={(el) => {
                      chipsRef.current[index] = el
                    }}
                  >
                    <span className="signal-chip__icon">{chip.icon}</span>
                    {chip.label}
                  </span>
                ))}
              </div>
            </div>

            <div className="hero-stats">
              {stats.map((stat, index) => (
                <article
                  key={stat.label}
                  className="stat-card"
                  ref={(el) => {
                    statsRef.current[index] = el
                  }}
                >
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