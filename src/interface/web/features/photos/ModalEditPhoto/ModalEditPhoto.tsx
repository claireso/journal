import { useCallback, memo } from 'react'

import { usePhoto } from '@web/features/photos/usePhotos'
import { Heading1 } from '@web/components/Headings'
import { Loader } from '@web/components/Loader'
import { Photo } from '@models'
import FormPhoto from '../FormPhoto'

interface ModalEditPhotoProps {
  id: Photo['id']
  onSubmit: (data: { id: number; data: Partial<Photo> }) => void
  onCancel: () => void
  isProcessing?: boolean
}

const ModalEditPhoto = ({ id, onSubmit, onCancel, isProcessing = false }: ModalEditPhotoProps) => {
  const { data: photo, error, isFetched } = usePhoto(id)

  const handleSubmit = useCallback(
    (data: Partial<Photo>) => {
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

  return (
    <>
      <Heading1>Edit photo</Heading1>
      <FormPhoto onSubmit={handleSubmit} photo={photo} isProcessing={isProcessing} />
    </>
  )
}

export default memo(ModalEditPhoto)
