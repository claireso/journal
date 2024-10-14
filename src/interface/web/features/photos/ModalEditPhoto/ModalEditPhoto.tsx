import { useCallback, memo } from 'react'

import { usePhoto } from '@web/features/photos/usePhotos'
import { Heading1 } from '@web/components/Headings'
import { Loader } from '@web/components/Loader'
import type { PhotoDto, PhotoUpdateDto } from '@dto'
import FormPhoto from '../FormPhoto'

interface ModalEditPhotoProps {
  id: PhotoDto['id']
  onSubmit: (data: { id: number; data: PhotoUpdateDto }) => void
  onCancel: () => void
  isProcessing?: boolean
}

const ModalEditPhoto = ({ id, onSubmit, onCancel, isProcessing = false }: ModalEditPhotoProps) => {
  const { data: photo, error, isFetched } = usePhoto(id)

  const handleSubmit = useCallback(
    (data: PhotoUpdateDto) => {
      onSubmit({ id: id, data })
    },
    [id, onSubmit]
  )

  if (!isFetched) {
    return <Loader />
  }

  if (error?.response.status === 404) {
    onCancel()
    return null
  }

  return <FormPhoto<PhotoUpdateDto> onSubmit={handleSubmit} photo={photo} isProcessing={isProcessing} />
}

export default memo(ModalEditPhoto)
