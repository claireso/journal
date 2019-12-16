import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import useHistory from '@common/hooks/useHistory'
import usePhotosReducer from './hooks/usePhotosReducer'

import Loader from '@common/components/Loader'
import Photos from './views/Photos'
import Welcome from './views/Welcome'

const LoaderWrapper = styled.div`
  grid-column: 1 / -1;
`

const App = props => {
  const initialState = {
    isLoading: false,
    items: props.items,
    pager: props.pager
  }

  const [state, actions] = usePhotosReducer(initialState)

  const { items: photos, pager } = state

  const onNavigate = useCallback(async event => {
    const page = event.state && event.state.page

    try {
      window.scroll(0, 0)
      actions.setLoading(true)
      await actions.getPhotos(page)
      actions.setLoading(false)
    } catch (err) {
      if (window.location.search !== '') {
        // eslint-disable-next-line require-atomic-updates
        window.location.href = '/'
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useHistory({ onPopstate: onNavigate })

  return state.isLoading ? (
    <LoaderWrapper>
      <Loader />
    </LoaderWrapper>
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
