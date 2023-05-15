'use client'

import { useCallback } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

import * as api from '@services/api'

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

enum Action {
  CREATE = 'create',
  EDIT = 'edit',
  DELETE = 'delete'
}

const Photos = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const action = searchParams?.get('action')
  const page = searchParams?.get('page')
  const id = searchParams?.get('id')

  const photoId = parseInt(id as string, 10)

  const filters = { page: (page as string) ?? '1' }

  const { isFetching, isSuccess, data } = usePhotos(filters)

  const { mutate: createPhoto, isLoading: isCreating } = useCreatePhoto(filters)
  const { mutate: editPhoto, isLoading: isEditing } = useEditPhoto(filters)
  const { mutate: deletePhoto, isLoading: isDeleting } = useDeletePhoto(filters)

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [page]
  )

  const onChangePage = useCallback((page: string) => navigate({ page }, { scroll: true }), [navigate])
  const onCloseModal = useCallback((options?: NavigateOptions) => navigate({}, options), [navigate])

  const onClickCreate = useCallback(() => {
    navigate({
      action: Action.CREATE
    })
  }, [navigate])

  const onClickDelete = useCallback(
    (id: number) => {
      navigate({
        action: Action.DELETE,
        id: id
      })
    },
    [navigate]
  )

  const onClickEdit = useCallback(
    (id: number) => {
      navigate({
        action: Action.EDIT,
        id: id
      })
    },
    [navigate]
  )

  const onCreatePhoto = useCallback(
    (data: FormData) => {
      createPhoto(data, {
        onSuccess() {
          onCloseModal({ scroll: true })
          if (page !== '1') {
            onChangePage('1')
          }
        },
        onError(err) {
          if (err instanceof api.getErrorConstructor()) {
            if (err.response.status === 401) return // @TODO find a better way
          }
          onCloseModal({ scroll: true })
        }
      })
    },
    [createPhoto, onCloseModal, page, onChangePage]
  )

  const onEditPhoto = useCallback(
    (data: { id: number; data: FormData }) => {
      editPhoto(data, {
        onSettled(data, err) {
          if (err instanceof api.getErrorConstructor()) {
            if (err.response.status === 401) return // @TODO find a better way
          }
          onCloseModal({ scroll: true })
        }
      })
    },
    [editPhoto, onCloseModal]
  )

  const onDeletePhoto = useCallback(
    (photoId: number) => {
      deletePhoto(photoId, {
        onSettled(data, err) {
          if (err instanceof api.getErrorConstructor()) {
            if (err.response.status === 401) return // @TODO find a better way
          }
          onCloseModal({ scroll: true })
        }
      })
    },
    [deletePhoto, onCloseModal]
  )

  return (
    <>
      <ListHeader>
        <Heading1 data-testid="list-heading">Your photos {data?.pager && <span>({data.pager.count})</span>}</Heading1>
        <ButtonPrimary data-testid="button-create" onClick={onClickCreate}>
          Add a new photo
          <IconPlus />
        </ButtonPrimary>
      </ListHeader>

      {isFetching ? (
        <Loader />
      ) : (
        isSuccess && (
          <>
            <AdminListPhotos photos={data.items} onEdit={onClickEdit} onDelete={onClickDelete} />
            <Pager {...data.pager} navigate={onChangePage} />
          </>
        )
      )}

      {action === Action.CREATE && (
        <Modal onClose={onCloseModal}>
          <ModalCreatePhoto onSubmit={onCreatePhoto} isProcessing={isCreating} />
        </Modal>
      )}

      {action === Action.EDIT && (
        <Modal onClose={onCloseModal}>
          <ModalEditPhoto id={photoId} onSubmit={onEditPhoto} isProcessing={isEditing} />
        </Modal>
      )}

      {action === Action.DELETE && (
        <Modal onClose={onCloseModal}>
          <ModalDeletePhoto id={photoId} onConfirm={onDeletePhoto} onCancel={onCloseModal} isProcessing={isDeleting} />
        </Modal>
      )}
    </>
  )
}

export default Photos
