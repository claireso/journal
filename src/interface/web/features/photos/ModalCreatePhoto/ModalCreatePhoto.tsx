import { memo } from 'react'

import type { PhotoInsertDto } from '@dto'
import { Heading2 } from '@web/components/Headings'
import FormPhoto from '../FormPhoto'

interface ModalCreatePhotoProps {
  onSubmit: (data: PhotoInsertDto) => void
  isProcessing?: boolean
}

const ModalCreatePhoto = ({ onSubmit, isProcessing = false }: ModalCreatePhotoProps) => {
  return (
    <>
      <Heading2>Create a photo</Heading2>
      <FormPhoto<PhotoInsertDto> onSubmit={onSubmit} isProcessing={isProcessing} />
    </>
  )
}

export default memo(ModalCreatePhoto)