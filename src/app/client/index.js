import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Styles from './Styles'

import TranslationsContext from '@common/context/Translations'
import Loader from '@common/components/Loader'

import Photos from './Photos'
import Welcome from './Welcome'
import BannerOfline from './components/banners/Offline'
import BannerNotifications from './components/banners/Notifications'

const Main = styled.main`
  max-width: var(--container-max-width);
  padding: 0 2rem;
  margin: 0 auto;

  @media (min-width: 800px) {
    padding: 0 4rem;
  }
`

const getPhotos = async page => {
  let url = '/api/photos'

  if (page !== undefined && page !== null) {
    url += `?page=${page}`
  }

  const response = await fetch(url)

  if (response.status === 200) {
    return await response.json()
  }

  // redirect to homepage
  if (window.location.search !== '') {
    window.location.href = '/'
  }
}

const Page = props => {
  const [state, setState] = useState({
    isLoading: false,
    items: props.items,
    pager: props.pager
  })

  const { items: photos, pager } = state

  const loadPhotos = async page => {
    setState({ isLoading: true })
    const data = await getPhotos(page)
    data && setState({ ...state, ...data, isLoading: false })
  }

  const onNavigate = event => {
    window.scroll(0, 0)
    loadPhotos(event.state && event.state.page)
  }

  useEffect(async () => {
    // listen history
    window.addEventListener('popstate', onNavigate)

    return () => window.removeEventListener('popstate', onNavigate)
  }, [])

  return (
    <TranslationsContext.Provider value={props.translations.client}>
      <Styles />

      <BannerOfline />
      <BannerNotifications />

      <Main>
        {state.isLoading ? (
          <Loader />
        ) : photos && photos.length > 0 ? (
          <Photos photos={photos} pager={pager} />
        ) : (
          <Welcome />
        )}
      </Main>
    </TranslationsContext.Provider>
  )
}

Page.propTypes = {
  items: PropTypes.array,
  pager: PropTypes.object,
  translations: PropTypes.object.isRequired
}

export default Page
