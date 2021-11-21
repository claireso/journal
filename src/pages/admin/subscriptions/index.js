import { useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'

import Layout from '@features/admin/Layout'
import useSubscriptions from '@features/subscriptions/useSubscriptions'
import AdminListSubscriptions from '@features/subscriptions/AdminListSubscriptions'
import ModalDeleteSubscription from '@features/subscriptions/ModalDeleteSubscription'

import { Loader } from '@components/Loader'
import { ListHeader } from '@components/List'
import { Heading1 } from '@components/Headings'
import Modal from '@components/Modal'
import Pager from '@components/Pager'

const ACTION_TYPES = {
  DELETE: 'delete'
}

const Subscriptions = () => {
  const [{ data, pager, isLoading }, { loadSubscriptions }] = useSubscriptions()

  const router = useRouter()
  let {
    query: { page, action, id },
    pathname
  } = router

  if (id) {
    id = Number(id)
  }

  useEffect(() => {
    if (router.isReady) {
      loadSubscriptions(page)
    }
  }, [page])

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
  const onCloseModal = () => navigate()

  const onClickDelete = useCallback(
    (id) => {
      navigate({
        action: ACTION_TYPES.DELETE,
        id: id
      })
    },
    [navigate]
  )

  return (
    <>
      <ListHeader>
        <Heading1 data-testid="list-heading">Your subscriptions {pager && <span>({pager.count})</span>}</Heading1>
      </ListHeader>

      {isLoading ? (
        <Loader />
      ) : (
        <>
          <AdminListSubscriptions subscriptions={data} onDelete={onClickDelete} />
          <Pager {...pager} navigate={onChangePage} />
        </>
      )}

      {action === ACTION_TYPES.DELETE && (
        <Modal onClose={onCloseModal}>
          <ModalDeleteSubscription id={id} />
        </Modal>
      )}
    </>
  )
}

Subscriptions.Layout = Layout

export default Subscriptions
