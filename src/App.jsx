import { useEffect, useMemo, useRef, useState } from 'react'
import FloatingNav from './components/FloatingNav'
import ProgressBar from './components/ProgressBar'
import Hero from './components/Hero'
import AboutSection from './components/AboutSection'
import SkillsSection from './components/SkillsSection'
import HorizontalScrollSection from './components/HorizontalScrollSection'
import ProjectSection from './components/ProjectSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import { navItems } from './data/portfolioData'

const THEME_STORAGE_KEY = 'portfolio-theme'

export default function App() {
  const [activeId, setActiveId] = useState('home')
  const [pageReady, setPageReady] = useState(false)
  const [theme, setTheme] = useState(() => localStorage.getItem(THEME_STORAGE_KEY) || 'light')
  const navLockRef = useRef(null)
  const navUnlockTimeoutRef = useRef(null)

  const sectionIds = useMemo(() => navItems.map((item) => item.id), [])

  useEffect(() => {
    const timer = setTimeout(() => setPageReady(true), 40)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  }, [theme])

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    const activeObserver = new IntersectionObserver(
      (entries) => {
        if (navLockRef.current) return

        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visibleEntries.length > 0) {
          setActiveId(visibleEntries[0].target.id)
        }
      },
      {
        threshold: [0.28, 0.5, 0.7],
        rootMargin: '-10% 0px -42% 0px',
      },
    )

    sections.forEach((section) => activeObserver.observe(section))

    return () => activeObserver.disconnect()
  }, [sectionIds])

  useEffect(() => {
    const revealTargets = document.querySelectorAll(
      '.hero-copy, .hero-panel, .section-shell, .footer-shell'
    )

    revealTargets.forEach((node) => {
      node.classList.add('reveal-on-scroll')
    })

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed')
            revealObserver.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -8% 0px',
      }
    )

    revealTargets.forEach((node) => revealObserver.observe(node))

    return () => revealObserver.disconnect()
  }, [])

  const scrollToSection = (id) => {
    const section = document.getElementById(id)
    if (!section) return

    navLockRef.current = id
    setActiveId(id)

    if (navUnlockTimeoutRef.current) {
      clearTimeout(navUnlockTimeoutRef.current)
    }

    section.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })

    const unlockWhenArrived = () => {
      const rect = section.getBoundingClientRect()
      const arrived = Math.abs(rect.top) < 80

      if (arrived) {
        navLockRef.current = null
        setActiveId(id)
        window.removeEventListener('scroll', unlockWhenArrived)
      }
    }

    window.addEventListener('scroll', unlockWhenArrived, { passive: true })

    navUnlockTimeoutRef.current = setTimeout(() => {
      navLockRef.current = null
      window.removeEventListener('scroll', unlockWhenArrived)
    }, 1600)
  }

  useEffect(() => {
    return () => {
      if (navUnlockTimeoutRef.current) {
        clearTimeout(navUnlockTimeoutRef.current)
      }
    }
  }, [])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  return (
    <div className={`app-shell ${pageReady ? 'page-ready' : ''}`}>
      <ProgressBar />
      <div className="page-intro-glow" />
      <div className="bg-orb bg-orb--one" />
      <div className="bg-orb bg-orb--two" />
      <div className="bg-grid" />

      <FloatingNav
        items={navItems}
        activeId={activeId}
        onSelect={scrollToSection}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <main>
        <Hero
          onPrimaryClick={() => scrollToSection('writeups')}
          onSecondaryClick={() => scrollToSection('projects')}
        />
        <AboutSection />
        <ProjectSection />
        <HorizontalScrollSection />
        <SkillsSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  )
}