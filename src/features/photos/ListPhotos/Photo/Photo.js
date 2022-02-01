import React, { useRef } from 'react'
import PropTypes from 'prop-types'

import { PhotoTypes } from '@types'

import useInView from '@hooks/useInView'

import * as S from './Photo.styles'

const Photo = ({ title, description, source, portrait, position, square, color, row }) => {
  const dom = useRef(null)
  const isInView = useInView(dom)

  return (
    <S.Figure
      ref={dom}
      data-testid="photo"
      portrait={portrait}
      square={square}
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
        {isInView && <S.Picture src={source} alt="" />}
      </S.PictureWrapper>
      <S.Title>
        <span dangerouslySetInnerHTML={{ __html: title }} />

        {description && <S.Description>{description}</S.Description>}
      </S.Title>
    </S.Figure>
  )
}

Photo.propTypes = {
  ...PhotoTypes,
  row: PropTypes.number.isRequired
}

export default Photo
