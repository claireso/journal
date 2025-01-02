'use client'

import React, { useRef } from 'react'
import type { PhotoDto } from '@dto'

import AnimatedImage from '@web/components/AnimatedImage'
import Text from '@web/components/Text'
import useInView from '@web/hooks/useInView'
import { tokens } from '@web/theme/core/tokens.css'

import * as cls from './styles.css'

interface PhotoProps extends PhotoDto {
  row: number
}

const Photo = ({ title, description, media, position, color, row }: PhotoProps) => {
  const dom = useRef<HTMLElement>(null!)
  const isInView = useInView(dom)

  return (
    <figure
      className={cls.figure({
        landscape: !media.portrait && !media.square,
        portrait: media.portrait,
        square: media.square,
        position: position,
        highlight: !!color
      })}
      ref={dom}
      style={{
        gridRowStart: row
      }}
    >
      <div
        className={cls.pictureWrapper({
          portrait: media.portrait,
          square: media.square,
          highlight: !!color
        })}
        style={{
          color: color || tokens.colors.neutral['2extralight']
        }}
      >
        {isInView && <AnimatedImage className={cls.picture} src={media.source} />}
      </div>
      <figcaption className={cls.figcaption}>
        {title && (
          <Text as="span" size="sm">
            <span dangerouslySetInnerHTML={{ __html: title }} />
          </Text>
        )}
        {description && (
          <Text as="span" size="xs" color="neutral" italic>
            <span dangerouslySetInnerHTML={{ __html: description }} />
          </Text>
        )}
      </figcaption>
    </figure>
  )
}

export default Photo
