'use client'

import { useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import { useDeleteSubscription } from '../useSubscriptions'
import AdminModal from '@web/features/modal/AdminModal'

import { ButtonDanger, ButtonNeutral } from '@web/components/Buttons'

import * as cls from './styles.css'

interface ModalDeleteSubscriptionProps {
  id: string
}

const ModalDeleteSubscription = ({ id }: ModalDeleteSubscriptionProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [{ processing }, deleteAction] = useDeleteSubscription()

  const closeModal = useCallback(() => {
    const newSearchParams = new URLSearchParams(searchParams.toString())
    newSearchParams.delete('action')
    newSearchParams.delete('id')

    router.push(`?${newSearchParams.toString()}`)
  }, [router, searchParams])

  const onCancel = useCallback(() => {
    closeModal()
  }, [closeModal])

  const onDelete = useCallback(async () => {
    await deleteAction(id)
    closeModal()
    router.refresh()
  }, [id, closeModal, deleteAction, router])

  return (
    <AdminModal title="Delete subscription?">
      <p>This action can’t be undone</p>
      <input type="hidden" id={id} />
      <div className={cls.confirm}>
        <ButtonNeutral size="lg" onClick={onCancel}>
          Cancel
        </ButtonNeutral>
        <ButtonDanger size="lg" onClick={onDelete} loading={processing}>
          Delete
        </ButtonDanger>
      </div>
    </AdminModal>
  )
}

export default ModalDeleteSubscription
