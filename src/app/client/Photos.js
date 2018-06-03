import React from 'react'
import PropTypes from 'prop-types'

import Photo from './components/Photo'
import Pager from './components/Pager'

const Photos = (props = {}) => {
  return (
    <main>
      {props.photos.map((photo, index) => <Photo key={index} {...photo} />)}
      <Pager {...props.pager} />
    </main>
  )
}

Photos.propTypes = {
  photos: PropTypes.array.isRequired,
  pager: PropTypes.object.isRequired
}

export default Photos
