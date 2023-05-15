'use client'

import { useCallback } from 'react'
import { useRouter, useSearchParams, redirect } from 'next/navigation'
import { styled } from '@theme'

import { Loader, LoaderWrapper } from '@components/Loader'
import Pager from '@components/Pager'

import Welcome from '@features/client/Welcome'
import { usePhotos } from '@features/photos/usePhotos'
import ListPhotos from '@features/photos/ListPhotos'

const PagerWrapper = styled('div', {
  gridColumn: '1 / -1',
  m: '4.5rem 0',
  '@lg': {
    m: '8.5rem 0'
  }
})

export default function Page() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const page = searchParams?.get('page') ?? '1'
  const { isFetched, isFetching, data } = usePhotos({ page })

  const navigate = useCallback(
    (page: string) => {
      router.push(`/?page=${page}`)
      window.scrollTo(0, 0)
    },
    [router]
  )

  if (!isFetched || isFetching) {
    return (
      <LoaderWrapper>
        <Loader />
      </LoaderWrapper>
    )
  }

  if (!data || !data.items.length) {
    return <Welcome />
  }

  return (
    <>
      <ListPhotos photos={data.items} />
      <PagerWrapper>
        <Pager navigate={navigate} {...data.pager} />
      </PagerWrapper>
    </>
  )
}
