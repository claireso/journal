import { memo } from 'react'

import type { PhotoUpdateDto } from '@dto'
import FormPhoto from '../FormPhoto'
import AdminModal from '@web/features/modal/AdminModal'

import { getPhoto } from '@interface/controllers'
import { editPhotoAction } from '@infrastructure/actions'

interface ModalEditPhotoProps {
  photoId: string
}

const fetchPhoto = async (id: string) => {
  try {
    return await getPhoto(id)
  } catch (err) {
    // TODO: 404
    throw err
  }
}

const ModalEditPhoto = async ({ photoId }: ModalEditPhotoProps) => {
  const photo = await fetchPhoto(photoId)

  return (
    <AdminModal title="Edit photo">
      <FormPhoto<PhotoUpdateDto>
        photo={photo}
        action={editPhotoAction}
        successMessage={{ key: 'CRUD_PHOTO', message: 'Your photo has been updated successfully' }}
        errorMessage={{ key: 'CRUD_PHOTO', message: 'An error has occured during the update. Please retry' }}
      />
    </AdminModal>
  )
}

export default memo(ModalEditPhoto)
