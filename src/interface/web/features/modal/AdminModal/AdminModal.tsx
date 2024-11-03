'use client'

import Modal from '@web/components/Modal'
import { useRouter, useSearchParams } from 'next/navigation'

import React, { useCallback } from 'react'

interface AdminModalProps {
  title: string
  children: React.ReactNode
}

const AdminModal = ({ title, children }: AdminModalProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const onClose = useCallback(() => {
    const newSearchParams = new URLSearchParams(searchParams.toString())
    newSearchParams.delete('action')
    newSearchParams.delete('id')
    // todo: keep the page parameter
    router.push(`?${newSearchParams.toString()}`)
  }, [router, searchParams])

  return (
    <Modal title={title} onClose={onClose}>
      {children}
    </Modal>
  )
}

export default AdminModal
