import { useEffect, useState } from 'react'

export function useTypewriter(words, typingSpeed = 55, deletingSpeed = 28, pauseTime = 1000) {
  const [index, setIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (!words?.length) return

    const currentWord = words[index % words.length]

    let timeout

    if (!isDeleting && displayText.length < currentWord.length) {
      timeout = setTimeout(() => {
        setDisplayText(currentWord.slice(0, displayText.length + 1))
      }, typingSpeed)
    } else if (!isDeleting && displayText.length === currentWord.length) {
      timeout = setTimeout(() => {
        setIsDeleting(true)
      }, pauseTime)
    } else if (isDeleting && displayText.length > 0) {
      timeout = setTimeout(() => {
        setDisplayText(currentWord.slice(0, displayText.length - 1))
      }, deletingSpeed)
    } else if (isDeleting && displayText.length === 0) {
      setIsDeleting(false)
      setIndex((prev) => (prev + 1) % words.length)
    }

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, index, words, typingSpeed, deletingSpeed, pauseTime])

  return displayText
}