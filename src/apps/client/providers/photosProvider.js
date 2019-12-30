import React, { useReducer, useContext, useMemo } from 'react'
import PropTypes from 'prop-types'

import { getPhotos } from '@client/api'

const PhotosContext = React.createContext()

const TYPES = {
  SET_LOADING: 'SET_LOADING',
  GET_PHOTOS_SUCCESS: 'GET_PHOTOS_SUCCESS'
}

const photosReducer = (state, action) => {
  switch (action.type) {
    case TYPES.SET_LOADING:
      return { ...state, isLoading: action.isLoading }

    case TYPES.GET_PHOTOS_SUCCESS:
      return { ...state, ...action.response }

    default:
      return { ...state }
  }
}

const PhotosProvider = ({ initialState = {}, ...props } = {}) => {
  const [state, dispatch] = useReducer(photosReducer, initialState)
  const value = useMemo(() => [state, dispatch], [state])

  return <PhotosContext.Provider value={value} {...props} />
}

PhotosProvider.propTypes = {
  initialState: PropTypes.object
}

const usePhotos = () => {
  const context = useContext(PhotosContext)

  if (!context) {
    throw new Error('usePhotos must be used within a PhotosProvider')
  }

  const [state, dispatch] = context

  return [
    state,
    {
      setLoading: isLoading =>
        dispatch({ type: TYPES.SET_LOADING, isLoading: isLoading }),
      getPhotos: async page => {
        try {
          const response = await getPhotos(page)

          dispatch({ type: TYPES.GET_PHOTOS_SUCCESS, response })
        } catch (err) {
          throw new Error('Can not get photos')
        }
      }
    }
  ]
}

export { PhotosProvider, usePhotos }
