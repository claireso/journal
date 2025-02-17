import React, { ComponentProps } from 'react'
import type { PhotoDto } from '@dto'

import AnimatedImage from '@web/components/AnimatedImage'
import Text from '@web/components/Text'
import { tokens } from '@web/theme/core/tokens.css'

import * as cls from './styles.css'

interface PhotoProps extends PhotoDto {
  row: number
}

const getAnimatedImageProps = (media: PhotoDto['media']): ComponentProps<typeof AnimatedImage> => {
  const props = {
    src: media.source,
    alt: ''
  } as ComponentProps<typeof AnimatedImage>

  // fallback for legacy media (compute aspect ratio width and height)
  if (!('size' in media)) {
    props.unoptimized = true

    if (media.portrait) {
      props.width = 2
      props.height = 3
    } else if (media.square) {
      props.width = 1
      props.height = 1
    } else {
      props.width = 3
      props.height = 2
    }

    return props
  }

  props.width = media.size.width / 2
  props.height = media.size.height / 2

  return props
}

const Photo = ({ title, description, media, position, color, row }: PhotoProps) => {
  return (
    <figure
      className={cls.figure({
        landscape: !media.portrait && !media.square,
        portrait: media.portrait,
        square: media.square,
        position: position,
        highlight: !!color
      })}
      style={{
        gridRowStart: row
      }}
    >
      <div
        className={cls.pictureWrapper({
          highlight: !!color
        })}
        style={{
          color: color || tokens.colors.neutral['2extralight']
        }}
      >
        <AnimatedImage {...getAnimatedImageProps(media)} />
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
