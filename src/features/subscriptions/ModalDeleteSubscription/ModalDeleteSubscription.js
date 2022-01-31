import PropTypes from 'prop-types'

import { ButtonPrimary, ButtonSecondary } from '@components/Buttons'
import { Heading1 } from '@components/Headings'
import Text from '@components/Text'

import useSubscriptions from '@features/subscriptions/useSubscriptions'

const ModalDeleteSubscription = ({ onClose, id }) => {
  const [{ isProcessing }, { deleteSubscription }] = useSubscriptions()

  const onCancel = () => onClose()

  const onConfirm = async () => {
    await deleteSubscription(id)
    onClose()
  }

  return (
    <>
      <Heading1>Are you sure?</Heading1>
      <p>This action is irreversible</p>
      <Text align="right">
        <ButtonSecondary onClick={onCancel}> Cancel </ButtonSecondary>
        <ButtonPrimary onClick={onConfirm} isLoading={isProcessing}>
          {' '}
          Yes{' '}
        </ButtonPrimary>
      </Text>
    </>
  )
}

ModalDeleteSubscription.propTypes = {
  id: PropTypes.number.isRequired,
  onClose: PropTypes.func
}

ModalDeleteSubscription.defaultProps = {
  onClose: () => {}
}

export default ModalDeleteSubscription
