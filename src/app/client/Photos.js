import React from 'react'
import PropTypes from 'prop-types'

import Photo from './components/Photo'
import Pager from './components/Pager'

const Photos = (props = {}) => {
  return (
    <React.Fragment>
      {props.photos.map((photo, index) => <Photo key={index} {...photo} />)}
      <Pager {...props.pager} />
    </React.Fragment>
  )
}

Photos.propTypes = {
  photos: PropTypes.array.isRequired,
  pager: PropTypes.object.isRequired
}

export default Photos
