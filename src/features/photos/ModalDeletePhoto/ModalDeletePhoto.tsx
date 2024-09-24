import { useCallback } from 'react'

import { Photo } from '@models'
import { ButtonPrimary, ButtonSecondary } from '@components/Buttons'
import { Heading1 } from '@components/Headings'
import Text from '@components/Text'

interface ModalDeletePhoto {
  id: Photo['id']
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

export default ModalDeletePhoto
