import api from '../api'

export const LOAD_PHOTOS_REQUEST = 'LOAD_PHOTOS_REQUEST'
export const LOAD_PHOTOS_SUCCESS = 'LOAD_PHOTOS_SUCCESS'
export const LOAD_PHOTOS_ERROR = 'LOAD_PHOTOS_ERROR'

export const CREATE_PHOTO_REQUEST = 'CREATE_PHOTO_REQUEST'
export const CREATE_PHOTO_SUCCESS = 'CREATE_PHOTO_SUCCESS'
export const CREATE_PHOTO_ERROR = 'CREATE_PHOTO_ERROR'

export const loadPhotos = () => ({
  types: [LOAD_PHOTOS_REQUEST, LOAD_PHOTOS_SUCCESS, LOAD_PHOTOS_ERROR],
  promise: () => api.get('/photos')
})

export const createPhoto = (data) => ({
  types: [CREATE_PHOTO_REQUEST, CREATE_PHOTO_SUCCESS, CREATE_PHOTO_ERROR],
  promise: () => api.post('/photos', { data })
})