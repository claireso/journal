import { memo } from 'react'

import { getPhoto, editPhoto } from '@application/usecases'
import AdminModal from '@web/features/modal/AdminModal'
import FormPhoto from '../FormPhoto'

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
      <FormPhoto
        photo={photo}
        action={editPhoto}
        successMessage={{ key: 'CRUD_PHOTO', message: 'Your photo has been updated successfully' }}
        errorMessage={{ key: 'CRUD_PHOTO', message: 'An error has occured during the update. Please retry' }}
      />
    </AdminModal>
  )
}

export default memo(ModalEditPhoto)
