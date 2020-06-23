import React, { useCallback, memo } from 'react'
import { format, parseISO } from 'date-fns'
import PropTypes from 'prop-types'

import * as S from './Subscription.styles'

import { IconDelete } from '@components/Icons'
import { ButtonIcon } from '@components/Buttons'

const Subscription = ({ onDelete, id, ...props }) => {
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
        <ButtonIcon
          onClick={handleDelete}
          title="Revoke"
          data-testid="button-revoke"
        >
          <IconDelete />
        </ButtonIcon>
      </S.SubscriptionTools>
    </S.SubscriptionWrapper>
  )
}

Subscription.propTypes = {
  id: PropTypes.number.isRequired,
  created_at: PropTypes.string.isRequired,
  subscription: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired
}

export default memo(Subscription)
