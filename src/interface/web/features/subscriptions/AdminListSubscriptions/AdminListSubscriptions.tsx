import React from 'react'

import type { SubscriptionsDto } from '@dto'

import { List } from '@web/components/List'
import Subscription from './Subscription'

interface AdminListSubscriptionsProps {
  subscriptions: SubscriptionsDto['items']
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
