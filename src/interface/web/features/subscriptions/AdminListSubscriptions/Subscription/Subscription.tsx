import React, { useCallback, memo, useMemo } from 'react'
import { format, parseISO } from 'date-fns'

import * as S from './Subscription.styles'
import { Subscription as TSubscription } from '@domain/entities'

import { IconDelete } from '@web/components/Icons'
import { ButtonIcon } from '@web/components/Buttons'

interface SubscriptionProps extends TSubscription {
  onDelete: (id: TSubscription['id']) => void
}

const Subscription = ({ onDelete, id, ...props }: SubscriptionProps) => {
  const createdAt = props.created_at as unknown

  const handleDelete = useCallback(() => {
    onDelete(id)
  }, [id, onDelete])

  return (
    <S.SubscriptionWrapper data-testid="subscription">
      <dl>
        <dt>Created at:</dt>
        <dd>{format(parseISO(createdAt as string), 'yyyy-MM-dd HH:mm:ss')}</dd>

        <dt>Endpoint:</dt>
        <dd>{props.subscription.endpoint}</dd>
      </dl>
      <S.SubscriptionTools>
        <ButtonIcon onClick={handleDelete} title="Revoke" data-testid="button-revoke">
          <IconDelete />
        </ButtonIcon>
      </S.SubscriptionTools>
    </S.SubscriptionWrapper>
  )
}

export default memo(Subscription)
