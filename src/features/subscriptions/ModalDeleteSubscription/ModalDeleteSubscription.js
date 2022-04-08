import { useCallback } from 'react'
import PropTypes from 'prop-types'

import { ButtonPrimary, ButtonSecondary } from '@components/Buttons'
import { Heading1 } from '@components/Headings'
import Text from '@components/Text'

const ModalDeleteSubscription = ({ onConfirm, onCancel, isProcessing, id }) => {
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

ModalDeleteSubscription.propTypes = {
  id: PropTypes.number.isRequired,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
  isProcessing: PropTypes.bool
}

ModalDeleteSubscription.defaultProps = {
  onCancel: () => {},
  onConfirm: () => {},
  isProcessing: false
}

export default ModalDeleteSubscription
