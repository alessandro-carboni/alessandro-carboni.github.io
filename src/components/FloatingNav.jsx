import { useEffect, useRef, useState } from 'react'
import { FaMoon, FaSun } from 'react-icons/fa'

export default function FloatingNav({ items, activeId, onSelect, theme, onToggleTheme }) {
  const itemRefs = useRef({})
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 })

  useEffect(() => {
    const activeNode = itemRefs.current[activeId]
    if (!activeNode) return

    setIndicatorStyle({
      left: activeNode.offsetLeft,
      width: activeNode.offsetWidth,
      opacity: 1,
    })
  }, [activeId])

  return (
    <div className="floating-nav-wrap">
      <div className="floating-nav-shell">
        <nav className="floating-nav" aria-label="Primary">
          <div className="floating-nav__indicator" style={indicatorStyle} />
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