import { useCallback } from 'react'

import { ButtonDanger, ButtonSecondary } from '@web/components/Buttons'

import * as cls from './styles.css'

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
      <p>This can’t be undone</p>
      <div className={cls.confirm}>
        <ButtonSecondary size="lg" onClick={onCancel}>
          Cancel
        </ButtonSecondary>
        <ButtonDanger size="lg" onClick={onClickConfirm} loading={isProcessing}>
          Delete
        </ButtonDanger>
      </div>
    </>
  )
}

export default ModalDeleteSubscription
