import React, { useState, useEffect, useRef } from 'react'

type ImageProps = Omit<React.ComponentProps<'img'>, 'alt' | 'src'>

interface AnimatedImage extends ImageProps {
  src: string
}

const AnimatedImage = ({ src, ...props }: AnimatedImage) => {
  const [loaded, setLoaded] = useState(false)
  const dom = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const img = new Image()
    img.src = src

    img.onload = () => setLoaded(true)
  }, [src])

  useEffect(() => {
    if (!loaded) return

    if (dom.current) {
      dom.current.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 2000,
        delay: 50,
        easing: 'cubic-bezier(.17,.67,.21,.97)',
        fill: 'forwards'
      })
    }
  }, [loaded])

  if (!loaded) return null

  return <img ref={dom} alt="" src={src} {...props} style={{ opacity: 0 }} />
}

export default AnimatedImage
