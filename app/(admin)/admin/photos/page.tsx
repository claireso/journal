'use client'

import { useCallback } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

import * as api from '@web/services/api'

import { usePhotos, useCreatePhoto, useEditPhoto, useDeletePhoto } from '@web/features/photos/usePhotos'
import AdminListPhotos from '@web/features/photos/AdminListPhotos'
import ModalDeletePhoto from '@web/features/photos/ModalDeletePhoto'
import ModalCreatePhoto from '@web/features/photos/ModalCreatePhoto'
import ModalEditPhoto from '@web/features/photos/ModalEditPhoto'

import { Loader } from '@web/components/Loader'
import Text from '@web/components/Text'
import Icon from '@web/components/Icons'
import Toolbar from '@web/components/Toolbar'
import { ButtonPrimary } from '@web/components/Buttons'
import { Heading2 } from '@web/components/Headings'
import Modal from '@web/components/Modal'
import Pager from '@web/components/Pager'
import EmptyZone from '@web/components/EmptyZone'
import { PhotoInsertDto, PhotoUpdateDto } from '@dto'

import * as cls from './styles.css'

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

  const { isSuccess, isFetched, error, data } = usePhotos(filters)

  const { mutate: createPhoto, isPending: isCreating } = useCreatePhoto(filters)
  const { mutate: editPhoto, isPending: isEditing } = useEditPhoto(filters)
  const { mutate: deletePhoto, isPending: isDeleting } = useDeletePhoto(filters)

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
    (data: PhotoInsertDto) => {
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
    (data: { id: number; data: PhotoUpdateDto }) => {
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

  if (error && [400, 404].includes(error.response.status)) {
    navigate({ page: '1' })
    return null
  }

  return (
    <>
      <Toolbar className={cls.header}>
        <Heading2>
          Your photos{' '}
          {data?.pager && (
            <Text as="span" color="neutral">
              ({data.pager.count})
            </Text>
          )}
        </Heading2>
        <ButtonPrimary onClick={onClickCreate}>
          <span className={cls.buttonCreateText}>Add a new photo</span>
          <Icon name="plus" size="sm" />
        </ButtonPrimary>
      </Toolbar>

      {!isFetched && <Loader />}

      {isFetched && isSuccess && (
        <>
          {data.pager.count === 0 ? (
            <EmptyZone>No photos published yet.</EmptyZone>
          ) : (
            <>
              <AdminListPhotos photos={data.items} onEdit={onClickEdit} onDelete={onClickDelete} />
              <Pager {...data.pager} navigate={onChangePage} />
            </>
          )}
        </>
      )}

      {action === Action.CREATE && (
        <Modal title="Create a photo" onClose={onCloseModal}>
          <ModalCreatePhoto onSubmit={onCreatePhoto} isProcessing={isCreating} />
        </Modal>
      )}

      {action === Action.EDIT && (
        <Modal title="Edit photo" onClose={onCloseModal}>
          <ModalEditPhoto id={photoId} onSubmit={onEditPhoto} onCancel={onCloseModal} isProcessing={isEditing} />
        </Modal>
      )}

      {action === Action.DELETE && (
        <Modal title="Delete photo?" onClose={onCloseModal}>
          <ModalDeletePhoto id={photoId} onConfirm={onDeletePhoto} onCancel={onCloseModal} isProcessing={isDeleting} />
        </Modal>
      )}
    </>
  )
}

export default Photos
