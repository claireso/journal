'use client'

import { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import type { Pager } from '@domain/entities'
import _Pager from '@web/components/Pager'

interface PagerProps extends Pick<React.ComponentProps<typeof _Pager>, 'layout'> {
  pager: Pager
}

const Pager = ({ pager, layout }: PagerProps) => {
  const router = useRouter()

  const navigate = useCallback(
    (page: string) => {
      router.push(`?page=${page}`)
    },
    [router]
  )

  console.log({ pager })

  return <_Pager navigate={navigate} layout={layout} {...pager} />
}

export default Pager
