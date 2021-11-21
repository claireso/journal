import React from 'react'
import PropTypes from 'prop-types'

import { SubscriptionTypes } from '@types'

import { List } from '@components/List'
import Subscription from './Subscription'

const AdminListSubscriptions = ({ subscriptions, onDelete }) => {
  return (
    <List>
      {subscriptions.map((subscription) => (
        <Subscription key={subscription.id} {...subscription} onDelete={onDelete} />
      ))}
    </List>
  )
}

AdminListSubscriptions.propTypes = {
  subscriptions: PropTypes.arrayOf(PropTypes.shape(SubscriptionTypes)),
  onDelete: PropTypes.func
}

AdminListSubscriptions.defaultProps = {
  subscriptions: [],
  onDelete: () => {}
}

export default React.memo(AdminListSubscriptions)
