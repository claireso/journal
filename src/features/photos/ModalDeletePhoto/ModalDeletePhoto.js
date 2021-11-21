import PropTypes from 'prop-types'

import { PrimaryButton, SecondaryButton } from '@components/Buttons'
import { Heading1 } from '@components/Headings'
import Text from '@components/Text'

import usePhotos from '@features/photos/usePhotos'

const ModalDeletePhoto = ({ onClose, id }) => {
  const [{ isProcessing }, { deletePhoto }] = usePhotos()

  const onCancel = () => onClose()

  const onConfirm = async () => {
    await deletePhoto(id)
    onClose()
  }

  return (
    <>
      <Heading1>Are you sure?</Heading1>
      <p>This action is irreversible</p>
      <Text align="right">
        <SecondaryButton onClick={onCancel}> Cancel </SecondaryButton>
        <PrimaryButton onClick={onConfirm} isLoading={isProcessing}>
          {' '}
          Yes{' '}
        </PrimaryButton>
      </Text>
    </>
  )
}

ModalDeletePhoto.propTypes = {
  onClose: PropTypes.func,
  id: PropTypes.number.isRequired
}

ModalDeletePhoto.defaultProps = {
  onClose: () => {}
}

export default ModalDeletePhoto
