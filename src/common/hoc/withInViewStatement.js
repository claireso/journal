/* eslint react/no-find-dom-node: 0 */

import React, { useState, useEffect, useRef } from 'react'
import ReactDom from 'react-dom'

export default WrappedComponent => {
  return props => {
    const [inView, setInView] = useState(false)
    const targetComp = useRef(null)

    useEffect(() => {
      const config = {
        root: null,
        rootMargin: '0px',
        threshold: 0
      }

      const targetDom = ReactDom.findDOMNode(targetComp.current)

      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          const isInView = entry.isIntersecting

          setInView(isInView)

          if (isInView) {
            observer.unobserve(entry.target)
          }
        })
      }, config)

      observer.observe(targetDom)

      return () => observer.unobserve(targetDom)
    }, [])

    return <WrappedComponent ref={targetComp} inView={inView} {...props} />
  }
}
