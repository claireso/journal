import { Fragment, useCallback } from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'

import Pager from '@components/client/Pager'

import Photo from './components/Photo'

const Photos = (props = {}) => {
  const navigate = useCallback((page) => {
    Router.push({ pathname: '/', query: { page } })
    window.scrollTo(0, 0)
  }, [])

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
