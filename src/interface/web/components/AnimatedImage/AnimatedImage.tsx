'use client'

import NextImage, { ImageProps } from 'next/image'
import React, { useCallback } from 'react'
import clsx from '@utils/clsx'

import * as cls from './AnimatedImage.css'

const AnimatedImage = ({ src, className, width, height, alt, unoptimized }: ImageProps) => {
  const onLoad = useCallback((event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: 2000,
      delay: 50,
      easing: 'cubic-bezier(.17,.67,.21,.97)',
      fill: 'forwards'
    })
  }, [])

  return (
    <NextImage
      src={`${process.env.NEXT_PUBLIC_WEBSITE_URL}${src}`}
      loading="lazy"
      className={clsx([cls.picture, className])}
      alt={alt}
      style={{
        opacity: 0
      }}
      quality={80}
      onLoad={onLoad}
      width={width}
      height={height}
      // fallback for legacy media
      unoptimized={unoptimized ?? (!width || !height)}
    />
  )
}

export default AnimatedImage
