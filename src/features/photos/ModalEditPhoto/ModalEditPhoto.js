import { useEffect, useCallback, memo } from 'react'
import PropTypes from 'prop-types'

import { Heading1 } from '@components/Headings'

import FormPhoto from '../FormPhoto'
import usePhotos from '@features/photos/usePhotos'

const ModalEditPhoto = ({ id, onClose }) => {
  const [{ data, detail, isProcessing }, { editPhoto, loadPhoto }] = usePhotos()

  let photo = data?.find((p) => p.id == id)

  if (!photo) {
    photo = detail?.id == id ? detail : undefined
  }

  useEffect(() => {
    if (!photo) {
      loadPhoto(id)
    }
  }, [id, photo, loadPhoto])

  const handleSubmit = useCallback(
    async (data) => {
      await editPhoto(id, data)
      onClose()
    },
    [id, editPhoto, onClose]
  )

  if (photo === undefined) return null

  return (
    <>
      <Heading1>Edit photo</Heading1>
      <FormPhoto onSubmit={handleSubmit} photo={photo} isProcessing={isProcessing} />
    </>
  )
}

ModalEditPhoto.propTypes = {
  id: PropTypes.number.isRequired,
  onClose: PropTypes.func
}

ModalEditPhoto.defaultProps = {
  onClose: () => {}
}

export default memo(ModalEditPhoto)
