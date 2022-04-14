import { useCallback } from 'react'
import { useRouter } from 'next/router'

import * as api from '@services/api'

import Layout from '@features/admin/Layout'
import AdminListSubscriptions from '@features/subscriptions/AdminListSubscriptions'
import ModalDeleteSubscription from '@features/subscriptions/ModalDeleteSubscription'

import { useSubscriptions, useDeleteSubscription } from '@features/subscriptions/useSubscriptions'

import { Loader } from '@components/Loader'
import { ListHeader } from '@components/List'
import { Heading1 } from '@components/Headings'
import Modal from '@components/Modal'
import Pager from '@components/Pager'

enum Action {
  CREATE = 'create',
  EDIT = 'edit',
  DELETE = 'delete'
}

const Subscriptions = () => {
  const router = useRouter()
  const { pathname } = router

  const { action, page, id } = router.query ?? {}

  const subscriptionId = parseInt(id as string, 10)

  const filters = { page: page as string }

  const { isFetching, isSuccess, data } = useSubscriptions(filters, { enabled: router.isReady })

  const { mutate: deleteSubscription, isLoading: isDeleting } = useDeleteSubscription(filters)

  const navigate = useCallback(
    (params: Query = {}, options = {}) => {
      const query: Query = {}
      if (page) query['page'] = page as string
      router.push({ pathname: pathname, query: { ...query, ...params } }, undefined, { scroll: false, ...options })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [page]
  )

  const onChangePage = useCallback((page) => navigate({ page }, { scroll: true }), [navigate])
  const onCloseModal = useCallback(() => navigate(), [navigate])

  const onClickDelete = useCallback(
    (id: number) => {
      navigate({
        action: Action.DELETE,
        id: id
      })
    },
    [navigate]
  )

  const onDeleteSubscription = useCallback(
    (subscriptionId: number) => {
      deleteSubscription(subscriptionId, {
        onSettled(data, err) {
          if (err instanceof api.getErrorConstructor()) {
            if (err.response.status === 401) return // @TODO find a better way
          }
          onCloseModal()
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

      {isSuccess && (
        <>
          <AdminListSubscriptions subscriptions={data.items} onDelete={onClickDelete} />
          <Pager {...data.pager} navigate={onChangePage} />
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

Subscriptions.Layout = Layout

export default Subscriptions
