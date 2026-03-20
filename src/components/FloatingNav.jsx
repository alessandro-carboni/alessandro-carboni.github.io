import { useEffect, useRef, useState } from 'react'
import { FaMoon, FaSun } from 'react-icons/fa'

export default function FloatingNav({ items, activeId, onSelect, theme, onToggleTheme }) {
  const navRef = useRef(null)
  const itemRefs = useRef({})
  const settleTimeoutRef = useRef(null)
  const latestTargetRef = useRef(activeId)
  const isStretchingRef = useRef(false)

  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0,
    borderRadius: 999,
    transform: 'scaleX(1)',
  })

  const getNavBounds = () => {
    const nav = navRef.current
    if (!nav) return null

    const children = items
      .map((item) => itemRefs.current[item.id])
      .filter(Boolean)

    if (!children.length) return null

    const first = children[0]
    const last = children[children.length - 1]

    return {
      minLeft: first.offsetLeft,
      maxRight: last.offsetLeft + last.offsetWidth,
    }
  }

  const clampStretch = (left, width) => {
    const bounds = getNavBounds()
    if (!bounds) {
      return { left, width }
    }

    let nextLeft = left
    let nextRight = left + width

    if (nextLeft < bounds.minLeft) {
      nextLeft = bounds.minLeft
    }

    if (nextRight > bounds.maxRight) {
      nextRight = bounds.maxRight
    }

    const nextWidth = Math.max(nextRight - nextLeft, 0)

    return {
      left: nextLeft,
      width: nextWidth,
    }
  }

  const getItemMetrics = (id) => {
    const node = itemRefs.current[id]
    if (!node) return null

    return {
      left: node.offsetLeft,
      width: node.offsetWidth,
      right: node.offsetLeft + node.offsetWidth,
      center: node.offsetLeft + node.offsetWidth / 2,
    }
  }

  useEffect(() => {
    const target = getItemMetrics(activeId)
    if (!target) return

    latestTargetRef.current = activeId

    const currentLeft = indicatorStyle.opacity ? indicatorStyle.left : target.left
    const currentWidth = indicatorStyle.opacity ? indicatorStyle.width : target.width
    const currentRight = currentLeft + currentWidth
    const currentCenter = currentLeft + currentWidth / 2

    const movingRight = target.center > currentCenter
    const distance = Math.abs(target.center - currentCenter)
    const stretchBoost = Math.min(30 + distance * 0.16, 110)

    const rawStretchLeft = movingRight
      ? currentLeft
      : Math.min(target.left - stretchBoost, currentLeft)

    const rawStretchRight = movingRight
      ? Math.max(target.right + stretchBoost, currentRight)
      : currentRight

    const stretched = clampStretch(rawStretchLeft, rawStretchRight - rawStretchLeft)

    isStretchingRef.current = true

    setIndicatorStyle({
      left: stretched.left,
      width: stretched.width,
      opacity: 1,
      borderRadius: 999,
      transform: 'scaleX(1.02)',
    })

    if (settleTimeoutRef.current) {
      clearTimeout(settleTimeoutRef.current)
    }

    settleTimeoutRef.current = setTimeout(() => {
      const finalTarget = getItemMetrics(latestTargetRef.current)
      if (!finalTarget) return

      isStretchingRef.current = false

      setIndicatorStyle({
        left: finalTarget.left,
        width: finalTarget.width,
        opacity: 1,
        borderRadius: 999,
        transform: 'scaleX(1)',
      })
    }, 210)

    return () => {
      if (settleTimeoutRef.current) {
        clearTimeout(settleTimeoutRef.current)
      }
    }
  }, [activeId])

  useEffect(() => {
    const handleResize = () => {
      const target = getItemMetrics(latestTargetRef.current)
      if (!target) return

      setIndicatorStyle((prev) => ({
        ...prev,
        left: target.left,
        width: target.width,
        opacity: 1,
        transform: isStretchingRef.current ? prev.transform : 'scaleX(1)',
      }))
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="floating-nav-wrap">
      <div className="floating-nav-shell">
        <nav className="floating-nav" aria-label="Primary" ref={navRef}>
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