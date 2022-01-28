import { useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'

import { Loader, LoaderWrapper } from '@components/Loader'
import Pager from '@components/Pager'

import Layout from '@features/client/Layout'
import Welcome from '@features/client/Welcome'
import usePhotos from '@features/photos/usePhotos'
import ListPhotos from '@features/photos/ListPhotos'

const PagerWrapper = styled.div`
  grid-column: 1 / -1;
  margin: 4.5rem 0;

  @media (min-width: 800px) {
    margin: 8.5rem 0;
  }
`

const Homepage = () => {
  const [{ data, pager, isLoading }, { loadPhotos }] = usePhotos()
  const router = useRouter()
  const { page } = router.query

  useEffect(() => {
    if (router.isReady) {
      loadPhotos(page)
    }
  }, [page])

  const navigate = useCallback((page) => {
    router.push({ pathname: '/', query: { page } })
    window.scrollTo(0, 0)
  }, [])

  if (isLoading) {
    return (
      <LoaderWrapper>
        <Loader />
      </LoaderWrapper>
    )
  }

  if (!data.length) {
    return <Welcome />
  }

  return (
    <>
      <ListPhotos photos={data} />
      <PagerWrapper>
        <Pager navigate={navigate} {...pager} />
      </PagerWrapper>
    </>
  )
}

Homepage.Layout = Layout

export default Homepage
