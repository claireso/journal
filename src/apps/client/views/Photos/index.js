import React, { Fragment, useCallback } from 'react'
import PropTypes from 'prop-types'

import useHistory from '@common/hooks/useHistory'

import Photo from '../../components/Photo'
import Pager from '../../components/Pager'

const Photos = (props = {}) => {
  const history = useHistory()

  const navigate = useCallback(
    page => history.pushState({ page }, '', `?page=${page}`),
    [history]
  )

  return (
    <Fragment>
      {props.photos.map((photo, index) => (
        <Photo key={index} {...photo} row={index + 1} />
      ))}
      <Pager {...props.pager} navigate={navigate} />
    </Fragment>
  )
}

Photos.propTypes = {
  photos: PropTypes.array.isRequired,
  pager: PropTypes.object.isRequired
}

export default Photos
