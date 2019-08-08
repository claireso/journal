import { useReducer } from 'react'

import { getPhotos } from '@client/api'
import photosReducer, { TYPES } from './reducer/photos'

export default (initialState = {}) => {
  const [state, dispatch] = useReducer(photosReducer, initialState)

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
