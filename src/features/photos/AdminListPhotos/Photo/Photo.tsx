import React, { useRef, useCallback } from 'react'

import * as S from './Photo.styles'

import { EnhancedPhoto } from '@models'
import useInView from '@hooks/useInView'

import AnimatedImage from '@components/AnimatedImage'
import { IconPencil, IconDelete } from '@components/Icons'
import { ButtonIcon } from '@components/Buttons'

interface PhotoProps extends EnhancedPhoto {
  onEdit: (id: number) => void
  onDelete: (id: number) => void
}

const Photo = ({ id, color, source, title, description, onEdit, onDelete }: PhotoProps) => {
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

export default Photo
