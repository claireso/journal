import { useCallback } from 'react'

import type { PhotoDto } from '@dto'
import { ButtonDanger, ButtonSecondary } from '@web/components/Buttons'

import * as cls from './styles.css'

interface ModalDeletePhoto {
  id: PhotoDto['id']
  onCancel: () => void
  onConfirm: (id: number) => void
  isProcessing?: boolean
}

const ModalDeletePhoto = ({ onCancel, onConfirm, id, isProcessing = false }: ModalDeletePhoto) => {
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

export default ModalDeletePhoto
