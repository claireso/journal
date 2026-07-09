'use client'

import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

import type { Pager as PagerEntity } from '@domain/entities'
import _Pager from '@web/components/Pager'

interface PagerProps extends Pick<React.ComponentProps<typeof _Pager>, 'layout'> {
  pager: PagerEntity
}

const Pager = ({ pager, layout }: PagerProps) => {
  const router = useRouter()

  const navigate = useCallback(
    (page: string) => {
      router.push(`?page=${page}`)
    },
    [router]
  )

  return <_Pager navigate={navigate} layout={layout} {...pager} />
}

export default Pager
