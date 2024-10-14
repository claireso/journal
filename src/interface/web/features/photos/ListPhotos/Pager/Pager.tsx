'use client'

import { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import _Pager from '@web/components/Pager'

import * as cls from './styles.css'

interface PagerProps {
  pager: {
    count?: number
    first?: number
    prev?: number
    next?: number
    last?: number
  }
}

const Pager = ({ pager }: PagerProps) => {
  const router = useRouter()

  const navigate = useCallback(
    (page: string) => {
      router.push(`/?page=${page}`)
    },
    [router]
  )

  return (
    <div className={cls.wrapper}>
      <_Pager navigate={navigate} {...pager}></_Pager>
    </div>
  )
}

export default Pager
