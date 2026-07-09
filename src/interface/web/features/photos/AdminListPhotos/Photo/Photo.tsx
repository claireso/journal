import React from 'react'

import { type PhotoDto } from '@dto'
import { formatDate } from '@utils/date'
import Text from '@web/components/Text'
import Actions from './Actions'
import Media from './Media'
import * as cls from './styles.css'

type PhotoProps = PhotoDto

const Photo = ({ id, color, media, title, description, created_at }: PhotoProps) => {
  return (
    <div className={cls.wrapper}>
      <Media {...media} color={color}>
        <Actions photoId={id} />
      </Media>
      <div className={cls.content}>
        <div className={cls.contentInner}>
          {title && (
            <Text as="span" size="sm">
              <span dangerouslySetInnerHTML={{ __html: title }} />
            </Text>
          )}
          {description && (
            <Text as="span" size="sm" color="neutral">
              <span dangerouslySetInnerHTML={{ __html: description }} />
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
