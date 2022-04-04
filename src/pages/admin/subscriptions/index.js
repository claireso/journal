import { useCallback } from 'react'
import { useRouter } from 'next/router'

import Layout from '@features/admin/Layout'
import AdminListSubscriptions from '@features/subscriptions/AdminListSubscriptions'
import ModalDeleteSubscription from '@features/subscriptions/ModalDeleteSubscription'

import { useSubscriptions, useDeleteSubscription } from '@features/subscriptions/useSubscriptions'

import { Loader } from '@components/Loader'
import { ListHeader } from '@components/List'
import { Heading1 } from '@components/Headings'
import Modal from '@components/Modal'
import Pager from '@components/Pager'

const ACTION_TYPES = {
  DELETE: 'delete'
}

const Subscriptions = () => {
  const router = useRouter()
  let {
    query: { page = '1', action, id },
    pathname
  } = router

  id = parseInt(id, 10)

  const filters = { page }

  const { isFetching, isSuccess, data } = useSubscriptions(filters, { enabled: router.isReady })

  const { mutate: deleteSubscription, isLoading: isDeleting } = useDeleteSubscription(filters)

  const navigate = useCallback(
    (params = {}) => {
      const query = {}
      if (page) query.page = page
      router.push({ pathname: pathname, query: { ...query, ...params } })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [page]
  )

  const onChangePage = (page) => navigate({ page })
  const onCloseModal = useCallback(() => navigate(), [navigate])

  const onClickDelete = useCallback(
    (id) => {
      navigate({
        action: ACTION_TYPES.DELETE,
        id: id
      })
    },
    [navigate]
  )

  const onDeleteSubscription = useCallback(
    (subscriptionId) => {
      deleteSubscription(subscriptionId, {
        onSettled(data, err) {
          if (err?.response.status === 401) return
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
          Your subscriptions {data.pager && <span>({data.pager.count})</span>}
        </Heading1>
      </ListHeader>

      {isFetching && <Loader />}

      {isSuccess && (
        <>
          <AdminListSubscriptions subscriptions={data.items} onDelete={onClickDelete} />
          <Pager {...data.pager} navigate={onChangePage} />
        </>
      )}

      {action === ACTION_TYPES.DELETE && (
        <Modal onClose={onCloseModal}>
          <ModalDeleteSubscription
            id={id}
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
