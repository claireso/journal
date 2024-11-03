'use client'

import React, { useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import { ButtonPrimary } from '@web/components/Buttons'
import Icon from '@web/components/Icons'

import { AdminAction } from '@utils/constant'

const ButtonCreatePhoto = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const onClick = useCallback(() => {
    const newSearchParams = new URLSearchParams(searchParams.toString())
    newSearchParams.set('action', AdminAction.CREATE)
    router.push(`?${newSearchParams.toString()}`)
  }, [router, searchParams])

  return (
    <ButtonPrimary onClick={onClick}>
      Add new photo
      <Icon name="plus" size="sm" />
    </ButtonPrimary>
  )
}

export default ButtonCreatePhoto
