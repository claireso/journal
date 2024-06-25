import { useCallback, memo } from 'react'

import { usePhoto } from '@features/photos/usePhotos'
import { Heading1 } from '@components/Headings'
import { EnhancedPhoto } from '@models'
import FormPhoto from '../FormPhoto'

interface ModalEditPhotoProps {
  id: EnhancedPhoto['id']
  onSubmit: (data: { id: number; data: FormData }) => void
  isProcessing?: boolean
}

const ModalEditPhoto = ({ id, onSubmit, isProcessing = false }: ModalEditPhotoProps) => {
  const { data: photo } = usePhoto(id)

  const handleSubmit = useCallback(
    (data: FormData) => {
      onSubmit({ id: id, data })
    },
    [id, onSubmit]
  )

  if (!photo) return null

  return (
    <>
      <Heading1>Edit photo</Heading1>
      <FormPhoto onSubmit={handleSubmit} photo={photo} isProcessing={isProcessing} />
    </>
  )
}

export default memo(ModalEditPhoto)
