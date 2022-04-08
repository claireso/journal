import { useCallback } from 'react'
import { useRouter } from 'next/router'

import Layout from '@features/admin/Layout'
import { usePhotos, useCreatePhoto, useEditPhoto, useDeletePhoto } from '@features/photos/usePhotos'
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
  const router = useRouter()
  let {
    query: { page = '1', action, id },
    pathname
  } = router

  id = parseInt(id, 10)

  const filters = { page }

  const {
    isFetching,
    data: { pager, items }
  } = usePhotos(filters, { enabled: router.isReady })

  const { mutate: createPhoto, isLoading: isCreating } = useCreatePhoto(filters)
  const { mutate: editPhoto, isLoading: isEditing } = useEditPhoto(filters)
  const { mutate: deletePhoto, isLoading: isDeleting } = useDeletePhoto(filters)

  const navigate = useCallback(
    (params = {}, options = {}) => {
      const query = {}
      if (page) query.page = page
      router.push({ pathname: pathname, query: { ...query, ...params } }, undefined, { scroll: false, ...options })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [page]
  )

  const onChangePage = useCallback((page) => navigate({ page }, { scroll: true }), [navigate])
  const onCloseModal = useCallback(() => navigate(), [navigate])

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

  const onCreatePhoto = useCallback(
    (data) => {
      createPhoto(data, {
        onSuccess() {
          onCloseModal()
          if (page !== '1') {
            onChangePage(1)
          }
        },
        onError(err) {
          if (err?.response.status === 401) return // @TODO find a better way
          onCloseModal()
        }
      })
    },
    [createPhoto, onCloseModal, page, onChangePage]
  )

  const onEditPhoto = useCallback(
    (data) => {
      editPhoto(data, {
        onSettled(data, err) {
          if (err?.response.status === 401) return
          onCloseModal()
        }
      })
    },
    [editPhoto, onCloseModal]
  )

  const onDeletePhoto = useCallback(
    (photoId) => {
      deletePhoto(photoId, {
        onSettled(data, err) {
          if (err?.response.status === 401) return
          onCloseModal()
        }
      })
    },
    [deletePhoto, onCloseModal]
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

      {isFetching ? (
        <Loader />
      ) : (
        <>
          <AdminListPhotos photos={items} onEdit={onClickEdit} onDelete={onClickDelete} />
          <Pager {...pager} navigate={onChangePage} />
        </>
      )}

      {action === ACTION_TYPES.CREATE && (
        <Modal onClose={onCloseModal}>
          <ModalCreatePhoto onSubmit={onCreatePhoto} isProcessing={isCreating} />
        </Modal>
      )}

      {action === ACTION_TYPES.EDIT && (
        <Modal onClose={onCloseModal}>
          <ModalEditPhoto id={id} onSubmit={onEditPhoto} isProcessing={isEditing} />
        </Modal>
      )}

      {action === ACTION_TYPES.DELETE && (
        <Modal onClose={onCloseModal}>
          <ModalDeletePhoto id={id} onConfirm={onDeletePhoto} isProcessing={isDeleting} />
        </Modal>
      )}
    </>
  )
}

Photos.Layout = Layout

export default Photos
