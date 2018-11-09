import React, { useState, useEffect } from 'react'
import { Spring } from 'react-spring'

const LazyLoadedImage = props => {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const img = new Image()
    img.src = props.src

    img.onload = () => setLoaded(true)
  }, [])

  if (!loaded) return null

  return (
    <Spring
      from={{ opacity: 0 }}
      to={{ opacity: 1 }}
      config={{ tension: 140, friction: 70 }}
    >
      {styles => <img style={styles} {...props} />}
    </Spring>
  )
}

export default LazyLoadedImage
