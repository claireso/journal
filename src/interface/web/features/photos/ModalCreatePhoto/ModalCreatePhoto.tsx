import { memo } from 'react'

import { PhotoInsertDto } from '@dto'
import AdminModal from '@web/features/modal/AdminModal'
import { createPhotoAction } from '@infrastructure/actions'
import FormPhoto from '../FormPhoto'

interface ModalCreatePhotoProps {}

const ModalCreatePhoto = ({}: ModalCreatePhotoProps) => {
  return (
    <AdminModal title="Create photo">
      <FormPhoto<PhotoInsertDto>
        action={createPhotoAction}
        successMessage={{ key: 'CRUD_PHOTO', message: 'Your photo has been created successfully' }}
        errorMessage={{ key: 'CRUD_PHOTO', message: 'An error has occured during the creation. Please retry' }}
      />
    </AdminModal>
  )
}

export default memo(ModalCreatePhoto)
