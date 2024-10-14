import React, { useRef, useCallback } from 'react'

import * as cls from './styles.css'

import { PhotoDto } from '@dto'
import useInView from '@web/hooks/useInView'
import { formatDate } from '@utils/date'

import { tokens } from '@web/theme/core/tokens.css'
import AnimatedImage from '@web/components/AnimatedImage'
import Text from '@web/components/Text'
import { ButtonDark, ButtonPrimary, ButtonDanger } from '@web/components/Buttons'
import Icon from '@web/components/Icons'
// import { ButtonIcon } from '@web/components/Buttons'

interface PhotoProps extends PhotoDto {
  onEdit: (id: number) => void
  onDelete: (id: number) => void
}

const Photo = ({ id, color, media, title, description, onEdit, onDelete, created_at }: PhotoProps) => {
  const dom = useRef(null)
  const inView = useInView(dom)

  const handleEdit = useCallback(() => onEdit(id), [id, onEdit])
  const handleDelete = useCallback(() => onDelete(id), [id, onDelete])

  return (
    <div ref={dom} className={cls.wrapper}>
      <div className={cls.pictureWrapper} style={{ color: color || tokens.colors.neutral['3extralight'] }}>
        {inView && <AnimatedImage className={cls.picture} src={media.source} width="100%" height="100%" />}
        <div className={cls.tools}>
          <ButtonDark onClick={handleEdit}>
            Edit <Icon name="pencil" size="xs" />
          </ButtonDark>
          <ButtonDanger onClick={handleDelete}>
            Delete <Icon name="trash" size="xs" />
          </ButtonDanger>
        </div>
      </div>
      <div className={cls.content}>
        <div className={cls.contentInner}>
          {title && (
            <Text as="span" size="sm">
              <span dangerouslySetInnerHTML={{ __html: title }} />
            </Text>
          )}
          {description && (
            <Text as="span" size="sm" color="neutral">
              {description}
            </Text>
          )}
        </div>
        <Text as="span" size="xxs" color="neutral" className={cls.date}>
          {formatDate(created_at)}
        </Text>
      </div>
    </div>
  )
}

export default Photo
