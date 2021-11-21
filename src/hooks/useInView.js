import { useEffect, useState } from 'react'

const config = {
  root: null,
  rootMargin: '0px',
  threshold: 0
}

const useInView = (element) => {
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

    observer.observe(element.current)

    return () => observer.disconnect()
  }, [element])

  return isInView
}

export default useInView
