import { useCallback, memo } from 'react'
import PropTypes from 'prop-types'

import { Heading1 } from '@components/Headings'
import FormPhoto from '../FormPhoto'

import { usePhoto } from '@features/photos/usePhotos'

const ModalEditPhoto = ({ id, onSubmit, isProcessing }) => {
  const { data: photo } = usePhoto(id)

  const handleSubmit = useCallback(
    (data) => {
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

ModalEditPhoto.propTypes = {
  id: PropTypes.number.isRequired,
  onSubmit: PropTypes.func,
  isProcessing: PropTypes.bool
}

ModalEditPhoto.defaultProps = {
  onSubmit: () => {},
  isProcessing: false
}

export default memo(ModalEditPhoto)
