import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { FaMoon, FaSun } from 'react-icons/fa'

export default function FloatingNav({ items, activeId, onSelect, theme, onToggleTheme }) {
  const navRef = useRef(null)
  const itemRefs = useRef({})
  const settleTimeoutRef = useRef(null)
  const previousActiveIdRef = useRef(activeId)
  const latestTargetRef = useRef(activeId)
  const isStretchingRef = useRef(false)

  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0,
    borderRadius: 999,
    transform: 'scaleX(1)',
  })

  const getItemMetrics = (id) => {
    const node = itemRefs.current[id]
    if (!node) return null

    return {
      id,
      left: node.offsetLeft,
      width: node.offsetWidth,
      right: node.offsetLeft + node.offsetWidth,
      center: node.offsetLeft + node.offsetWidth / 2,
    }
  }

  const getItemIndex = (id) => items.findIndex((item) => item.id === id)

  const moveIndicatorTo = (id) => {
    const target = getItemMetrics(id)
    if (!target) return

    setIndicatorStyle({
      left: target.left,
      width: target.width,
      opacity: 1,
      borderRadius: 999,
      transform: 'scaleX(1)',
    })
  }

  const getRangeMetrics = (fromId, toId) => {
    const fromIndex = getItemIndex(fromId)
    const toIndex = getItemIndex(toId)

    if (fromIndex === -1 || toIndex === -1) return null

    const start = Math.min(fromIndex, toIndex)
    const end = Math.max(fromIndex, toIndex)

    const involvedMetrics = items
      .slice(start, end + 1)
      .map((item) => getItemMetrics(item.id))
      .filter(Boolean)

    if (!involvedMetrics.length) return null

    const left = Math.min(...involvedMetrics.map((m) => m.left))
    const right = Math.max(...involvedMetrics.map((m) => m.right))

    return {
      left,
      width: right - left,
      right,
    }
  }

  useLayoutEffect(() => {
    const target = getItemMetrics(activeId)
    if (!target) return

    latestTargetRef.current = activeId
    previousActiveIdRef.current = activeId

    setIndicatorStyle({
      left: target.left,
      width: target.width,
      opacity: 1,
      borderRadius: 999,
      transform: 'scaleX(1)',
    })
  }, [items])

  useEffect(() => {
    const target = getItemMetrics(activeId)
    if (!target) return

    latestTargetRef.current = activeId

    const previousId = previousActiveIdRef.current
    const previousTarget = getItemMetrics(previousId)

    if (!previousTarget || previousId === activeId) {
      moveIndicatorTo(activeId)
      previousActiveIdRef.current = activeId
      return
    }

    const range = getRangeMetrics(previousId, activeId)
    if (!range) {
      moveIndicatorTo(activeId)
      previousActiveIdRef.current = activeId
      return
    }

    isStretchingRef.current = true

    setIndicatorStyle({
      left: range.left,
      width: range.width,
      opacity: 1,
      borderRadius: 999,
      transform: 'scaleX(1.015)',
    })

    if (settleTimeoutRef.current) {
      clearTimeout(settleTimeoutRef.current)
    }

    const fromIndex = getItemIndex(previousId)
    const toIndex = getItemIndex(activeId)
    const jumpSize = Math.abs(toIndex - fromIndex)

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

      previousActiveIdRef.current = latestTargetRef.current
    }, jumpSize >= 3 ? 240 : 200)

    return () => {
      if (settleTimeoutRef.current) {
        clearTimeout(settleTimeoutRef.current)
      }
    }
  }, [activeId, items])

  useEffect(() => {
    const handleResize = () => {
      if (settleTimeoutRef.current) {
        clearTimeout(settleTimeoutRef.current)
      }

      const currentId = isStretchingRef.current ? latestTargetRef.current : activeId
      const target = getItemMetrics(currentId)
      if (!target) return

      setIndicatorStyle({
        left: target.left,
        width: target.width,
        opacity: 1,
        borderRadius: 999,
        transform: 'scaleX(1)',
      })

      isStretchingRef.current = false
      previousActiveIdRef.current = currentId
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)

      if (settleTimeoutRef.current) {
        clearTimeout(settleTimeoutRef.current)
      }
    }
  }, [activeId])

  return (
    <div className="floating-nav-wrap">
      <div className="floating-nav-shell">
        <nav className="floating-nav" aria-label="Primary" ref={navRef}>
          <div
            className="floating-nav__indicator floating-nav__indicator--fluid"
            style={indicatorStyle}
          />

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