import React from 'react'

import { Subscription as TSubscription } from '@domain/entities'

import { List } from '@web/components/List'
import Subscription from './Subscription'

interface AdminListSubscriptionsProps {
  subscriptions: TSubscription[]
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
