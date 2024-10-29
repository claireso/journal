import React from 'react'
import { redirect } from 'next/navigation'

import { BadRequestError, NotFoundError } from '@domain/errors'
import { getPaginatedSubscriptions } from '@interface/controllers'

import EmptyZone from '@web/components/EmptyZone'
import Pager from '@web/components/Pager'
import TablePager from '@web/components/TablePager'
import Subscription from './Subscription'

interface AdminListSubscriptionsProps {
  page: string
}

const fetchSubscription = async (page: string) => {
  try {
    return await getPaginatedSubscriptions({ page: (page as string) ?? '1' })
  } catch (err) {
    if (err instanceof NotFoundError || err instanceof BadRequestError) {
      redirect('?')
    }
    throw err
  }
}

const AdminListSubscriptions = async ({ page }: AdminListSubscriptionsProps) => {
  const { pager, items: subscriptions } = await fetchSubscription(page ?? '1')

  if (pager.count === 0) {
    return <EmptyZone>No subscription yet.</EmptyZone>
  }

  return (
    <>
      <TablePager align="right" {...pager} />
      <ul>
        {subscriptions.map((subscription) => (
          <Subscription key={subscription.id} {...subscription} />
        ))}
      </ul>
      <Pager {...pager} navigate={() => {}} />
    </>
  )
}

export default React.memo(AdminListSubscriptions)
