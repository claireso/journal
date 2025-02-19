'use client'

import React, { ComponentProps } from 'react'

import { PhotoDto } from '@dto'
import AnimatedImage from '@web/components/AnimatedImage'
import { tokens } from '@web/theme/core/tokens.css'

import * as cls from './styles.css'

type MediaProps = PhotoDto['media'] & {
  color: PhotoDto['color']
  children: React.ReactNode
}

const getAnimatedImageProps = (media: PhotoDto['media']): ComponentProps<typeof AnimatedImage> => {
  const props = {
    src: media.source,
    alt: ''
  } as ComponentProps<typeof AnimatedImage>

  props.width = 400

  if (media.portrait) {
    props.height = Math.round(props.width * 1.5)
  } else if (media.square) {
    props.height = props.width
  } else {
    props.height = Math.round(props.width / 1.5)
  }

  return props
}

const Media = ({ color, children, ...media }: MediaProps) => {
  return (
    <div className={cls.pictureWrapper} style={{ color: color || tokens.colors.neutral['3extralight'] }}>
      <AnimatedImage className={cls.picture} {...getAnimatedImageProps(media)} />
      {children}
    </div>
  )
}

export default Media
