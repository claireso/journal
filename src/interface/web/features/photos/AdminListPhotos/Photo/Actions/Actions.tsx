'use client'

import React, { useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import { ButtonDark, ButtonDanger } from '@web/components/Buttons'
import Icon from '@web/components/Icons'

import { AdminAction } from '@utils/constant'

import * as cls from './styles.css'

interface ActionsProps {
  photoId: number
}

const Actions = ({ photoId }: ActionsProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const onAction = useCallback(
    (action: 'edit' | 'delete') => {
      const newSearchParams = new URLSearchParams(searchParams.toString())
      newSearchParams.set('action', action)
      newSearchParams.set('id', String(photoId))

      router.push(`?${newSearchParams.toString()}`)
    },
    [router, searchParams, photoId]
  )

  const onEdit = () => onAction(AdminAction.EDIT)
  const onDelete = () => onAction(AdminAction.DELETE)

  return (
    <div className={cls.actions}>
      <ButtonDark onClick={onEdit}>
        Edit <Icon name="pencil" size="xs" />
      </ButtonDark>
      <ButtonDanger onClick={onDelete}>
        Delete <Icon name="trash" size="xs" />
      </ButtonDanger>
    </div>
  )
}

export default Actions
