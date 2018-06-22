import api from '../api'

export const LOAD_PHOTOS_REQUEST = 'LOAD_PHOTOS_REQUEST'
export const LOAD_PHOTOS_SUCCESS = 'LOAD_PHOTOS_SUCCESS'
export const LOAD_PHOTOS_ERROR = 'LOAD_PHOTOS_ERROR'

export const loadPhotos = () => ({
  types: [LOAD_PHOTOS_REQUEST, LOAD_PHOTOS_SUCCESS, LOAD_PHOTOS_ERROR],
  promise: () => api.get('/photos')
})