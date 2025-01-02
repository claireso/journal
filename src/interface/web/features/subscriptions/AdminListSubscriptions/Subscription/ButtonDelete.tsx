'use client'

import { useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import { ButtonDanger } from '@web/components/Buttons'
import Icon from '@web/components/Icons'

import { AdminAction } from '@utils/constant'

interface ButtonDeleteProps {
  id: number
}

const ButtonDelete = ({ id }: ButtonDeleteProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleClick = useCallback(() => {
    const newSearchParams = new URLSearchParams(searchParams.toString())
    newSearchParams.set('action', AdminAction.DELETE)
    newSearchParams.set('id', String(id))

    router.push(`?${newSearchParams.toString()}`)
  }, [router, searchParams, id])

  return (
    <ButtonDanger onClick={handleClick}>
      Delete <Icon name="trash" />
    </ButtonDanger>
  )
}

export default ButtonDelete
