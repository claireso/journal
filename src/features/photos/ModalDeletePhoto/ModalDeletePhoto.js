import { useCallback } from 'react'
import PropTypes from 'prop-types'

import { ButtonPrimary, ButtonSecondary } from '@components/Buttons'
import { Heading1 } from '@components/Headings'
import Text from '@components/Text'

const ModalDeletePhoto = ({ onCancel, onConfirm, id, isProcessing }) => {
  const onClickConfirm = useCallback(() => {
    onConfirm(id)
  }, [id, onConfirm])

  return (
    <>
      <Heading1>Are you sure?</Heading1>
      <p>This action is irreversible</p>
      <Text align="right">
        <ButtonSecondary onClick={onCancel}> Cancel </ButtonSecondary>
        <ButtonPrimary onClick={onClickConfirm} isLoading={isProcessing}>
          {' '}
          Yes{' '}
        </ButtonPrimary>
      </Text>
    </>
  )
}

ModalDeletePhoto.propTypes = {
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
  id: PropTypes.number.isRequired,
  isProcessing: PropTypes.bool
}

ModalDeletePhoto.defaultProps = {
  onCancel: () => {},
  onConfirm: () => {},
  isProcessing: false
}

export default ModalDeletePhoto
