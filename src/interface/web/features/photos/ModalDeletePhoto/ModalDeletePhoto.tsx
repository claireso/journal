'use client'

import { useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import { useDeletePhoto } from '../usePhotos'

import { ButtonDanger, ButtonNeutral } from '@web/components/Buttons'
import AdminModal from '@web/features/modal/AdminModal'

import * as cls from './styles.css'

interface ModalDeletePhoto {
  photoId: string
}

const ModalDeletePhoto = ({ photoId }: ModalDeletePhoto) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [{ processing }, deletePhoto] = useDeletePhoto()

  const closeModal = useCallback(() => {
    const newSearchParams = new URLSearchParams(searchParams.toString())
    newSearchParams.delete('action')
    newSearchParams.delete('id')
    router.push(`?${newSearchParams.toString()}`)
  }, [router, searchParams])

  const onCancel = useCallback(() => {
    closeModal()
  }, [closeModal])

  const onConfirm = useCallback(async () => {
    await deletePhoto(photoId)
    closeModal()
    router.refresh()
  }, [closeModal, photoId, deletePhoto, router])

  return (
    <AdminModal title="Delete photo?">
      <p>This action can’t be undone</p>
      <div className={cls.confirm}>
        <ButtonNeutral size="lg" onClick={onCancel}>
          Cancel
        </ButtonNeutral>
        <ButtonDanger size="lg" onClick={onConfirm} loading={processing}>
          Delete
        </ButtonDanger>
      </div>
    </AdminModal>
  )
}

export default ModalDeletePhoto
