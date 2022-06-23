import { useCallback } from 'react'

import { ButtonPrimary, ButtonSecondary } from '@components/Buttons'
import { Heading1 } from '@components/Headings'
import Text from '@components/Text'

interface ModalDeleteSubscriptionProps {
  id: number
  onConfirm: (id: number) => void
  onCancel: () => void
  isProcessing?: boolean
}

const ModalDeleteSubscription = ({ onConfirm, onCancel, isProcessing = false, id }: ModalDeleteSubscriptionProps) => {
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

export default ModalDeleteSubscription
