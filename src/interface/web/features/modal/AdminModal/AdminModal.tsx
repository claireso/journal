'use client'

import Modal from '@web/components/Modal'
import { useRouter } from 'next/navigation'

import React, { useCallback } from 'react'

interface AdminModalProps {
  title: string
  children: React.ReactNode
}

const AdminModal = ({ title, children }: AdminModalProps) => {
  const router = useRouter()

  const onClose = useCallback(() => {
    // todo: keep the page parameter
    router.push('?')
  }, [router])

  return (
    <Modal title={title} onClose={onClose}>
      {children}
    </Modal>
  )
}

export default AdminModal
