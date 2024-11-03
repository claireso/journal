'use client'

import React, { useRef } from 'react'

import { PhotoDto } from '@dto'
import AnimatedImage from '@web/components/AnimatedImage'

import { tokens } from '@web/theme/core/tokens.css'

import useInView from '@web/hooks/useInView'

import * as cls from './styles.css'

type MediaProps = PhotoDto['media'] & {
  color: PhotoDto['color']
  children: React.ReactNode
}

const Media = ({ source, color, children }: MediaProps) => {
  const dom = useRef(null)
  const inView = useInView(dom)

  return (
    <div ref={dom} className={cls.pictureWrapper} style={{ color: color || tokens.colors.neutral['3extralight'] }}>
      {inView && <AnimatedImage className={cls.picture} src={source} width="100%" height="100%" />}
      {children}
    </div>
  )
}

export default Media
