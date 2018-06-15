import React from 'react'
import { format } from 'date-fns'
import PropTypes from 'prop-types'

import { ButtonLink } from '../components/Links'

const Subscription = (props = {}) => {
  return (
    <li className="list__item">
      <div className="list__subscription">
        <dl>
          <dt>Created at:</dt>
          <dd>{format(props.created_at, 'YYYY-MM-DD HH:mm:ss')}</dd>

          <dt>Endpoint:</dt>
          <dd>{props.subscription.endpoint}</dd>
        </dl>
        <p>
          <ButtonLink
            href={`/admin/subscriptions/${props.id}/delete`}
            label="Revoke"
            className="js-delete"
          />
        </p>
      </div>
    </li>
  )
}

Subscription.propTypes = {
  created_at: PropTypes.object,
  subscription: PropTypes.object.isRequired
}

export default Subscription
