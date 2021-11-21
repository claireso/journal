import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

const AnimatedImage = ({ src, ...props }) => {
  const [loaded, setLoaded] = useState(false)
  const dom = useRef()

  useEffect(() => {
    const img = new Image()
    img.src = src

    img.onload = () => setLoaded(true)
  }, [src])

  useEffect(() => {
    if (!loaded) return

    dom.current.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: 2000,
      delay: 50,
      easing: 'cubic-bezier(.17,.67,.21,.97)',
      fill: 'forwards'
    })
  }, [loaded])

  if (!loaded) return null

  return <img ref={dom} src={src} {...props} style={{ opacity: 0 }} />
}

AnimatedImage.propTypes = {
  src: PropTypes.string.isRequired
}

export default AnimatedImage
