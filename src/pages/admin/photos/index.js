import { useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'

import Layout from '@features/admin/Layout'
import usePhotos from '@features/photos/usePhotos'
import AdminListPhotos from '@features/photos/AdminListPhotos'
import ModalDeletePhoto from '@features/photos/ModalDeletePhoto'
import ModalCreatePhoto from '@features/photos/ModalCreatePhoto'
import ModalEditPhoto from '@features/photos/ModalEditPhoto'

import { Loader } from '@components/Loader'
import { IconPlus } from '@components/Icons'
import { ListHeader } from '@components/List'
import { ButtonPrimary } from '@components/Buttons'
import { Heading1 } from '@components/Headings'
import Modal from '@components/Modal'
import Pager from '@components/Pager'

const ACTION_TYPES = {
  CREATE: 'create',
  EDIT: 'edit',
  DELETE: 'delete'
}

const Photos = () => {
  const [{ data, pager, isLoading }, { loadPhotos }] = usePhotos()

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
      loadPhotos(page)
    }
  }, [page, loadPhotos])

  const navigate = useCallback(
    (params = {}, options = {}) => {
      const query = {}
      if (page) query.page = page
      router.push({ pathname: pathname, query: { ...query, ...params } }, undefined, { scroll: false, ...options })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [page]
  )

  const onChangePage = (page) => navigate({ page }, { scroll: true })
  const onCloseModal = () => navigate()

  const onClickCreate = useCallback(() => {
    navigate({
      action: ACTION_TYPES.CREATE
    })
  }, [navigate])

  const onClickDelete = useCallback(
    (id) => {
      navigate({
        action: ACTION_TYPES.DELETE,
        id: id
      })
    },
    [navigate]
  )

  const onClickEdit = useCallback(
    (id) => {
      navigate({
        action: ACTION_TYPES.EDIT,
        id: id
      })
    },
    [navigate]
  )

  return (
    <>
      <ListHeader>
        <Heading1 data-testid="list-heading">Your photos {pager && <span>({pager.count})</span>}</Heading1>
        <ButtonPrimary data-testid="button-create" onClick={onClickCreate}>
          Add a new photo
          <IconPlus />
        </ButtonPrimary>
      </ListHeader>

      {isLoading ? (
        <Loader />
      ) : (
        <>
          <AdminListPhotos photos={data} onEdit={onClickEdit} onDelete={onClickDelete} />
          <Pager {...pager} navigate={onChangePage} />
        </>
      )}

      {action === ACTION_TYPES.CREATE && (
        <Modal onClose={onCloseModal}>
          <ModalCreatePhoto />
        </Modal>
      )}

      {action === ACTION_TYPES.EDIT && (
        <Modal onClose={onCloseModal}>
          <ModalEditPhoto id={id} />
        </Modal>
      )}

      {action === ACTION_TYPES.DELETE && (
        <Modal onClose={onCloseModal}>
          <ModalDeletePhoto id={id} />
        </Modal>
      )}
    </>
  )
}

Photos.Layout = Layout

export default Photos
