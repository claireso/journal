import React from 'react'

import type { SubscriptionsDto } from '@dto'

import Subscription from './Subscription'

interface AdminListSubscriptionsProps {
  subscriptions: SubscriptionsDto['items']
  onDelete: (id: number) => void
}

const AdminListSubscriptions = ({ subscriptions, onDelete }: AdminListSubscriptionsProps) => {
  return (
    <ul>
      {subscriptions.map((subscription) => (
        <Subscription key={subscription.id} {...subscription} onDelete={onDelete} />
      ))}
    </ul>
  )
}

export default React.memo(AdminListSubscriptions)
