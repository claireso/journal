import { Fragment, useCallback } from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'

import Pager from '@components/Pager'

import Photo from './components/Photo'

import * as S from './Photos.styles'

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
      <S.PagerWrapper>
        <Pager {...props.pager} navigate={navigate} />
      </S.PagerWrapper>
    </Fragment>
  )
}

Photos.propTypes = {
  photos: PropTypes.array.isRequired,
  pager: PropTypes.object.isRequired
}

export default Photos
