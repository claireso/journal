import React from 'react'

import { List } from '@components/List'
import Subscription from './Subscription'

interface AdminListSubscriptionsProps {
  subscriptions: Subscription[]
  onDelete: (id: number) => void
}

const AdminListSubscriptions = ({ subscriptions, onDelete }: AdminListSubscriptionsProps) => {
  return (
    <List>
      {subscriptions.map((subscription) => (
        <Subscription key={subscription.id} {...subscription} onDelete={onDelete} />
      ))}
    </List>
  )
}

export default React.memo(AdminListSubscriptions)
