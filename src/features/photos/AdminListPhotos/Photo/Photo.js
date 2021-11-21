import React, { useRef, useCallback } from 'react'
import PropTypes from 'prop-types'

import * as S from './Photo.styles'

import { PhotoTypes } from '@types'

import useInView from '@hooks/useInView'

import AnimatedImage from '@components/AnimatedImage'
import { IconPencil, IconDelete } from '@components/Icons'
import { ButtonIcon } from '@components/Buttons'

const Photo = ({ id, color, source, title, description, onEdit, onDelete }) => {
  const dom = useRef(null)
  const inView = useInView(dom)

  const handleEdit = useCallback(() => onEdit(id), [id, onEdit])
  const handleDelete = useCallback(() => onDelete(id), [id, onDelete])

  return (
    <S.PhotoWrapper ref={dom} data-testid="photo">
      <S.PhotoPicture style={{ color: color || 'transparent' }}>
        {inView && <AnimatedImage src={source} />}
      </S.PhotoPicture>
      <S.PhotoInner>
        {title && <S.PhotoTitle dangerouslySetInnerHTML={{ __html: title }} />}
        {description && <S.PhotoDescription>{description}</S.PhotoDescription>}
      </S.PhotoInner>
      <S.PhotoTools>
        <ButtonIcon data-testid="button-edit" onClick={handleEdit} title="Edit">
          <IconPencil />
        </ButtonIcon>
        <ButtonIcon data-testid="button-delete" onClick={handleDelete} title="Delete">
          <IconDelete />
        </ButtonIcon>
      </S.PhotoTools>
    </S.PhotoWrapper>
  )
}

Photo.propTypes = {
  ...PhotoTypes,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}

export default Photo
