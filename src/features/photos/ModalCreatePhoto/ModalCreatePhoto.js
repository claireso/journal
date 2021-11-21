import { memo } from 'react'
import PropTypes from 'prop-types'

import { Heading2 } from '@components/Headings'
import FormPhoto from '../FormPhoto'

import usePhotos from '../usePhotos'

const ModalCreatePhoto = ({ onClose }) => {
  const [{ isProcessing }, { createPhoto }] = usePhotos()

  const handleSubmit = async (data) => {
    await createPhoto(data)
    onClose()
  }

  return (
    <>
      <Heading2>Create a photo</Heading2>
      <FormPhoto onSubmit={handleSubmit} isProcessing={isProcessing} />
    </>
  )
}

ModalCreatePhoto.propTypes = {
  onClose: PropTypes.func
}

ModalCreatePhoto.defaultProps = {
  onClose: () => {}
}

export default memo(ModalCreatePhoto)
