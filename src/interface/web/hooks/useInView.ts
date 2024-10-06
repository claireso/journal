import React, { useEffect, useState } from 'react'

const config = {
  root: null as null,
  rootMargin: '0px',
  threshold: 0
}

const useInView = (element: React.RefObject<HTMLElement>) => {
  const [isInView, setInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const _isInView = entry.isIntersecting

        setInView(_isInView)

        if (_isInView) {
          observer.unobserve(entry.target)
        }
      })
    }, config)

    if (element.current) {
      observer.observe(element.current)
    }

    return () => observer.disconnect()
  }, [element])

  return isInView
}

export default useInView
