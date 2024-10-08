'use client'

import { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { styled } from '@web/oldtheme'
import _Pager from '@web/components/Pager'

const PagerWrapper = styled('div', {
  gridColumn: '1 / -1',
  m: '4.5rem 0',
  '@lg': {
    m: '8.5rem 0'
  }
})

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
    <PagerWrapper>
      <_Pager navigate={navigate} {...pager}></_Pager>
    </PagerWrapper>
  )
}

export default Pager
