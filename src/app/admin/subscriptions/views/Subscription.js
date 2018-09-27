import React from 'react'
import { format } from 'date-fns'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { PrimaryButton } from '@admin/components/Buttons'

const SubscriptionWrapper = styled.li`
  list-style: none;
  padding: var(--gutter);
  font-size: 1.4rem;
  transition: background 100ms ease-out;

  &:hover {
    background: var(--secondary);
  }

  & + & {
    border-top: 1px solid var(--secondary);
  }

  dt {
    font-weight: 700;
    margin: 0 0 0.5rem;
  }

  dd {
    margin: 0 0 1rem;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`

const Subscription = (props = {}) => {
  return (
    <SubscriptionWrapper>
      <dl>
        <dt>Created at:</dt>
        <dd>{format(props.created_at, 'YYYY-MM-DD HH:mm:ss')}</dd>

        <dt>Endpoint:</dt>
        <dd>{props.subscription.endpoint}</dd>
      </dl>
      <p>
        <PrimaryButton onClick={props.onDelete.bind(this, props.id)}>
          Revoke
        </PrimaryButton>
      </p>
    </SubscriptionWrapper>
  )
}

Subscription.propTypes = {
  id: PropTypes.number.isRequired,
  created_at: PropTypes.object.isRequired,
  subscription: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired
}

export default Subscription
