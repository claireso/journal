import React from 'react'
import { redirect } from 'next/navigation'

import { BadRequestError, NotFoundError } from '@domain/errors'
import logger from '@infrastructure/logger'
import { getPaginatedSubscriptions } from '@application/usecases'

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
    logger.error({ err, ctx: `Admin subscriptions, can not get page "${page}"` })
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
