import { useEffect, useRef, useState } from 'react'
import { FaMoon, FaSun } from 'react-icons/fa'

export default function FloatingNav({ items, activeId, onSelect, theme, onToggleTheme }) {
  const itemRefs = useRef({})
  const previousActiveRef = useRef(activeId)
  const settleTimeoutRef = useRef(null)

  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0,
    borderRadius: 999,
    transform: 'scaleX(1)',
  })

  useEffect(() => {
    const activeNode = itemRefs.current[activeId]
    const previousNode = itemRefs.current[previousActiveRef.current]

    if (!activeNode) return

    const targetLeft = activeNode.offsetLeft
    const targetWidth = activeNode.offsetWidth

    if (!previousNode || previousActiveRef.current === activeId) {
      setIndicatorStyle({
        left: targetLeft,
        width: targetWidth,
        opacity: 1,
        borderRadius: 999,
        transform: 'scaleX(1)',
      })
      previousActiveRef.current = activeId
      return
    }

    const prevLeft = previousNode.offsetLeft
    const prevWidth = previousNode.offsetWidth
    const prevCenter = prevLeft + prevWidth / 2
    const nextCenter = targetLeft + targetWidth / 2
    const movingRight = nextCenter > prevCenter
    const distance = Math.abs(nextCenter - prevCenter)
    const stretchBoost = Math.min(28 + distance * 0.18, 90)

    const stretchLeft = movingRight ? prevLeft : targetLeft - stretchBoost
    const stretchRight = movingRight
      ? targetLeft + targetWidth + stretchBoost
      : prevLeft + prevWidth

    const stretchedWidth = stretchRight - stretchLeft

    setIndicatorStyle({
      left: stretchLeft,
      width: stretchedWidth,
      opacity: 1,
      borderRadius: 999,
      transform: movingRight ? 'scaleX(1.02)' : 'scaleX(1.02)',
    })

    if (settleTimeoutRef.current) {
      clearTimeout(settleTimeoutRef.current)
    }

    settleTimeoutRef.current = setTimeout(() => {
      setIndicatorStyle({
        left: targetLeft,
        width: targetWidth,
        opacity: 1,
        borderRadius: 999,
        transform: 'scaleX(1)',
      })
    }, 180)

    previousActiveRef.current = activeId

    return () => {
      if (settleTimeoutRef.current) {
        clearTimeout(settleTimeoutRef.current)
      }
    }
  }, [activeId])

  return (
    <div className="floating-nav-wrap">
      <div className="floating-nav-shell">
        <nav className="floating-nav" aria-label="Primary">
          <div className="floating-nav__indicator floating-nav__indicator--fluid" style={indicatorStyle} />
          {items.map((item) => (
            <button
              key={item.id}
              ref={(node) => {
                itemRefs.current[item.id] = node
              }}
              className={`floating-nav__item ${activeId === item.id ? 'is-active' : ''}`}
              onClick={() => onSelect(item.id)}
              type="button"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button
          type="button"
          className="theme-toggle"
          onClick={onToggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
        >
          <span className="theme-toggle__icon">
            {theme === 'dark' ? <FaSun /> : <FaMoon />}
          </span>
          <span className="theme-toggle__label">
            {theme === 'dark' ? 'Light' : 'Dark'}
          </span>
        </button>
      </div>
    </div>
  )
}