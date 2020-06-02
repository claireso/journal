import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSpring, animated } from 'react-spring'

const LazyLoadedImage = ({ src, ...props }) => {
  const [loaded, setLoaded] = useState(false)

  const styles = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { tension: 140, friction: 70 }
  })

  useEffect(() => {
    const img = new Image()
    img.src = src

    img.onload = () => setLoaded(true)
  }, [src])

  if (!loaded) return null

  return <animated.img style={styles} src={src} {...props} />
}

LazyLoadedImage.propTypes = {
  src: PropTypes.string.isRequired
}

export default LazyLoadedImage
