import React, { useCallback, memo, useMemo } from 'react'

import type { SubscriptionDto } from '@dto'
import { formatDateTime } from '@utils/date'

import Text from '@web/components/Text'
import { ButtonDanger } from '@web/components/Buttons'
import * as cls from './styles.css'
import Icon from '@web/components/Icons'

// import { IconDelete } from '@web/components/Icons'
// import { ButtonIcon } from '@web/components/Buttons'

interface SubscriptionProps extends SubscriptionDto {
  onDelete: (id: number) => void
}

const Subscription = ({ onDelete, id, ...props }: SubscriptionProps) => {
  const createdAt = props.created_at as unknown

  const handleDelete = useCallback(() => {
    onDelete(id)
  }, [id, onDelete])

  return (
    <li className={cls.wrapper}>
      <div className={cls.content}>
        <Text as="span" weight="semibold">
          Created at:{' '}
          <Text weight="normal" as="span">
            {formatDateTime(createdAt)}
          </Text>
        </Text>
        <Text as="span" weight="semibold">
          Endpoint:{' '}
          <Text className={cls.url} weight="normal" as="span">
            {props.subscription.endpoint}
          </Text>
        </Text>
      </div>

      <div>
        <ButtonDanger onClick={handleDelete}>
          Delete <Icon name="trash" />
        </ButtonDanger>
        {/* <ButtonIcon onClick={handleDelete} title="Revoke" data-testid="button-revoke">
          <IconDelete />
        </ButtonIcon> */}
      </div>
    </li>
  )
}

export default memo(Subscription)
