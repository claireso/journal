import React, { useCallback, memo } from 'react'
import { format, parseISO } from 'date-fns'

import * as S from './Subscription.styles'
import { Subscription as TSubscription } from '@models'

import { IconDelete } from '@components/Icons'
import { ButtonIcon } from '@components/Buttons'

interface SubscriptionProps extends TSubscription {
  onDelete: (id: TSubscription['id']) => void
}

const Subscription = ({ onDelete, id, ...props }: SubscriptionProps) => {
  const handleDelete = useCallback(() => {
    onDelete(id)
  }, [id, onDelete])

  return (
    <S.SubscriptionWrapper data-testid="subscription">
      <dl>
        <dt>Created at:</dt>
        <dd>{format(parseISO(props.created_at), 'yyyy-MM-dd HH:mm:ss')}</dd>

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
