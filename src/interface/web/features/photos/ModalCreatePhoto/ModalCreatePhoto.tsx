import { memo } from 'react'

import { createPhoto } from '@application/usecases'
import AdminModal from '@web/features/modal/AdminModal'
import FormPhoto from '../FormPhoto'

interface ModalCreatePhotoProps {}

const ModalCreatePhoto = ({}: ModalCreatePhotoProps) => {
  return (
    <AdminModal title="Create photo">
      <FormPhoto
        action={createPhoto}
        successMessage={{ key: 'CRUD_PHOTO', message: 'Your photo has been created successfully' }}
        errorMessage={{ key: 'CRUD_PHOTO', message: 'An error has occured during the creation. Please retry' }}
      />
    </AdminModal>
  )
}

export default memo(ModalCreatePhoto)
