import React from 'react'
import { format } from 'date-fns'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { IconDelete } from '@common/components/Icons'
import { ButtonIcon } from '@admin/components/Buttons'

const SubscriptionWrapper = styled.li`
  align-items: center;
  display: flex;
  font-size: 1.4rem;
  list-style: none;
  padding: 1.5rem;
  transition: background 100ms ease-out;

  &:hover {
    background: var(--gray-5);
  }

  & + & {
    border-top: 1px solid var(--secondary);
  }

  dl {
    margin: 0;
    padding-right: 4rem;
  }

  dt {
    font-weight: 700;
    margin: 0 0 0.5rem;
  }

  dd {
    margin: 0 0 1rem;
    word-wrap: break-word;
    word-break: break-all;
  }
`

const SubscriptionTools = styled.p`
  transition: opacity 150ms ease-out;

  button {
    opacity: 0.5;
    transition: opacity 150ms ease-out;

    &:hover {
      opacity: 1;
    }
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
      <SubscriptionTools>
        <ButtonIcon
          onClick={props.onDelete.bind(this, props.id)}
          title="Revoke"
        >
          <IconDelete />
        </ButtonIcon>
      </SubscriptionTools>
    </SubscriptionWrapper>
  )
}

Subscription.propTypes = {
  id: PropTypes.number.isRequired,
  created_at: PropTypes.string.isRequired,
  subscription: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired
}

export default Subscription
