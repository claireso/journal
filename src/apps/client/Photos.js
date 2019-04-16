import React, { useCallback } from 'react'
import PropTypes from 'prop-types'

import Photo from './components/Photo'
import Pager from './components/Pager'

const Photos = (props = {}) => {
  const navigate = useCallback(page => {
    const state = { page }
    window.history.pushState(state, '', `?page=${page}`)

    const popStateEvent = new PopStateEvent('popstate', { state })
    dispatchEvent(popStateEvent)
  }, [])

  return (
    <React.Fragment>
      {props.photos.map((photo, index) => (
        <Photo key={index} {...photo} />
      ))}
      <Pager {...props.pager} navigate={navigate} />
    </React.Fragment>
  )
}

Photos.propTypes = {
  photos: PropTypes.array.isRequired,
  pager: PropTypes.object.isRequired
}

export default Photos
