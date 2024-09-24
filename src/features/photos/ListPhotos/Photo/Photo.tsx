'use client'

import React, { useRef } from 'react'

import { Photo as IPhoto } from '@models'
import useInView from '@hooks/useInView'

import * as S from './Photo.styles'

interface PhotoProps extends IPhoto {
  row: number
}

const Photo = ({ title, description, media, position, color, row }: PhotoProps) => {
  const dom = useRef(null)
  const isInView = useInView(dom)

  return (
    <S.Figure
      ref={dom}
      data-testid="photo"
      portrait={media.portrait}
      square={media.square}
      // @ts-ignore
      position={position}
      withColor={!!color}
      css={{
        gridRowStart: row
      }}
    >
      <S.PictureWrapper
        css={{
          color: color || '$secondary200',
          '--aspect-ratio': media.portrait ? 2 / 3 : media.square ? 1 / 1 : 3 / 2
        }}
      >
        {isInView && <S.Picture src={media.source} />}
      </S.PictureWrapper>
      <S.Title>
        {title && <span dangerouslySetInnerHTML={{ __html: title }} />}
        {description && <S.Description>{description}</S.Description>}
      </S.Title>
    </S.Figure>
  )
}

export default Photo
