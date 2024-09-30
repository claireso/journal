import { memo } from 'react'

import { Photo } from '@models'
import { Heading2 } from '@web/components/Headings'
import FormPhoto from '../FormPhoto'

interface ModalCreatePhotoProps {
  onSubmit: (data: Partial<Photo>) => void
  isProcessing?: boolean
}

const ModalCreatePhoto = ({ onSubmit, isProcessing = false }: ModalCreatePhotoProps) => {
  return (
    <>
      <Heading2>Create a photo</Heading2>
      <FormPhoto onSubmit={onSubmit} isProcessing={isProcessing} />
    </>
  )
}

export default memo(ModalCreatePhoto)
