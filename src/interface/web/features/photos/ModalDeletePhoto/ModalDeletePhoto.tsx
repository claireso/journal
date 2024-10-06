import { useCallback } from 'react'

import type { PhotoDto } from '@dto'
import { ButtonPrimary, ButtonSecondary } from '@web/components/Buttons'
import { Heading1 } from '@web/components/Headings'
import Text from '@web/components/Text'

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
      <Heading1>Delete photo?</Heading1>
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

export default ModalDeletePhoto
