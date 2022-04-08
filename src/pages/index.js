import { useCallback } from 'react'
import { useRouter } from 'next/router'
import { styled } from '@theme'

import { Loader, LoaderWrapper } from '@components/Loader'
import Pager from '@components/Pager'

import Layout from '@features/client/Layout'
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

const Homepage = () => {
  const router = useRouter()
  const { page = '1' } = router.query
  const { isFetched, isFetching, data } = usePhotos({ page }, { enabled: router.isReady })

  const navigate = useCallback(
    (page) => {
      router.push({ pathname: '/', query: { page } })
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

  if (!data.items.length) {
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

Homepage.Layout = Layout

export default Homepage
