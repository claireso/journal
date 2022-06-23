import React, { useRef } from 'react'

import useInView from '@hooks/useInView'

import * as S from './Photo.styles'

interface PhotoProps extends Photo {
  row: number
}

const Photo = ({ title, description, source, portrait, position, square, color, row }: PhotoProps) => {
  const dom = useRef(null)
  const isInView = useInView(dom)

  return (
    <S.Figure
      ref={dom}
      data-testid="photo"
      portrait={portrait}
      square={square}
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
          '--aspect-ratio': portrait ? 2 / 3 : square ? 1 / 1 : 3 / 2
        }}
      >
        {isInView && <S.Picture src={source} />}
      </S.PictureWrapper>
      <S.Title>
        {title && <span dangerouslySetInnerHTML={{ __html: title }} />}
        {description && <S.Description>{description}</S.Description>}
      </S.Title>
    </S.Figure>
  )
}

export default Photo
