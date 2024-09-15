'use client'

import { useCallback } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

import * as api from '@services/api'
import { Subscription } from '@models'

import AdminListSubscriptions from '@features/subscriptions/AdminListSubscriptions'
import ModalDeleteSubscription from '@features/subscriptions/ModalDeleteSubscription'

import { useSubscriptions, useDeleteSubscription } from '@features/subscriptions/useSubscriptions'

import { Loader } from '@components/Loader'
import { ListHeader } from '@components/List'
import { Heading1 } from '@components/Headings'
import Modal from '@components/Modal'
import Pager from '@components/Pager'
import EmptyZone from '@components/EmptyZone'

enum Action {
  CREATE = 'create',
  EDIT = 'edit',
  DELETE = 'delete'
}

const Subscriptions = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const action = searchParams?.get('action')
  const page = searchParams?.get('page')
  const id = searchParams?.get('id')

  const subscriptionId = parseInt(id as string, 10)

  const filters = { page: (page as string) ?? '1' }

  const { isFetching, isFetched, isSuccess, data } = useSubscriptions(filters)

  const { mutate: deleteSubscription, isPending: isDeleting } = useDeleteSubscription(filters)

  const navigate = useCallback(
    (params: Query = {}, options?: NavigateOptions) => {
      const query: Query = {}
      if (page) query['page'] = page as string
      if (pathname) {
        // @ts-ignore
        const searchParams = new URLSearchParams({ ...query, ...params })

        router.push(`${pathname}?${searchParams.toString()}`)

        if (options?.scroll) {
          window.scrollTo(0, 0)
        }
      }
    },
    [page, pathname, router]
  )

  const onChangePage = useCallback((page: string) => navigate({ page }, { scroll: true }), [navigate])
  const onCloseModal = useCallback((options?: NavigateOptions) => navigate({}, options), [navigate])

  const onClickDelete = useCallback(
    (id: Subscription['id']) => {
      navigate({
        action: Action.DELETE,
        id: id
      })
    },
    [navigate]
  )

  const onDeleteSubscription = useCallback(
    (subscriptionId: Subscription['id']) => {
      deleteSubscription(subscriptionId, {
        onSettled(data, err) {
          if (err instanceof api.getErrorConstructor()) {
            if (err.response.status === 401) return // @TODO find a better way
          }
          onCloseModal({ scroll: true })
        }
      })
    },
    [deleteSubscription, onCloseModal]
  )

  return (
    <>
      <ListHeader>
        <Heading1 data-testid="list-heading">
          Your subscriptions {data?.pager && <span>({data.pager.count})</span>}
        </Heading1>
      </ListHeader>

      {isFetching && <Loader />}

      {isFetched && isSuccess && (
        <>
          {data.pager.count === 0 ? (
            <EmptyZone>No subscription yet.</EmptyZone>
          ) : (
            <>
              <AdminListSubscriptions subscriptions={data.items} onDelete={onClickDelete} />
              <Pager {...data.pager} navigate={onChangePage} />
            </>
          )}
        </>
      )}

      {action === Action.DELETE && (
        <Modal onClose={onCloseModal}>
          <ModalDeleteSubscription
            id={subscriptionId}
            onConfirm={onDeleteSubscription}
            onCancel={onCloseModal}
            isProcessing={isDeleting}
          />
        </Modal>
      )}
    </>
  )
}

export default Subscriptions
