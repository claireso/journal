import { useCallback } from 'react'

import { ButtonPrimary, ButtonSecondary } from '@web/components/Buttons'
import { Heading1 } from '@web/components/Headings'
import Text from '@web/components/Text'

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
      <Heading1>Delete subscription?</Heading1>
      <p>This can’t be undone</p>
      <Text align="right">
        <ButtonSecondary onClick={onCancel}>Cancel</ButtonSecondary>
        <ButtonPrimary onClick={onClickConfirm} isLoading={isProcessing}>
          Delete
        </ButtonPrimary>
      </Text>
    </>
  )
}

export default ModalDeleteSubscription
