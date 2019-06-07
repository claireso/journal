import React, { useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'

import Photos from './views/Photos'
import Welcome from './views/Welcome'

import Loader from '@common/components/Loader'

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

const App = props => {
  const [state, setState] = useState({
    isLoading: false,
    items: props.items,
    pager: props.pager
  })

  const { items: photos, pager } = state

  const loadPhotos = useCallback(async page => {
    setState({ isLoading: true })
    const data = await getPhotos(page)
    data && setState(prevState => ({ ...prevState, ...data, isLoading: false }))
  }, [])

  const onNavigate = useCallback(
    event => {
      window.scroll(0, 0)
      loadPhotos(event.state && event.state.page)
    },
    [loadPhotos]
  )

  useEffect(() => {
    // listen history
    window.addEventListener('popstate', onNavigate)

    return () => {
      window.removeEventListener('popstate', onNavigate)
    }
  }, [onNavigate])

  return state.isLoading ? (
    <Loader />
  ) : photos && photos.length > 0 ? (
    <Photos photos={photos} pager={pager} />
  ) : (
    <Welcome />
  )
}

App.propTypes = {
  items: PropTypes.array,
  pager: PropTypes.object
}

export default App
