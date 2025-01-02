import Toolbar from '@web/components/Toolbar'
import { Heading2 } from '@web/components/Headings'

import AdminListSubscriptions from '@web/features/subscriptions/AdminListSubscriptions'
import ModalDeleteSubscription from '@web/features/subscriptions/ModalDeleteSubscription'

import { AdminAction } from '@utils/constant'

import * as cls from './styles.css'

interface SubscriptionsProps {}

const PageSubscriptions = async ({ params, searchParams }: NextPageProps<SubscriptionsProps>) => {
  const { action, page, id: subscriptionId } = searchParams

  return (
    <>
      <Toolbar className={cls.header}>
        <Heading2>Your subscriptions</Heading2>
      </Toolbar>

      <AdminListSubscriptions page={(page as string) ?? '1'} />

      {action === AdminAction.DELETE && <ModalDeleteSubscription id={subscriptionId as string} />}
    </>
  )
}

export default PageSubscriptions
