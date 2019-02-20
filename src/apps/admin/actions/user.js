import api from '../api'

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_ERROR = 'LOGIN_ERROR'

export const SIGN_OUT_REQUEST = 'SIGN_OUT_REQUEST'
export const SIGN_OUT_SUCCESS = 'SIGN_OUT_SUCCESS'
export const SIGN_OUT_ERROR = 'SIGN_OUT_ERROR'

export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST'
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS'
export const LOAD_USER_ERROR = 'LOAD_USER_ERROR'

export const UNAUTHORIZED_ERROR = 'UNAUTHORIZED_ERROR'

export const login = data => ({
  types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR],
  promise: () => api.post('/login', { data })
})

export const signOut = () => ({
  types: [SIGN_OUT_REQUEST, SIGN_OUT_SUCCESS, SIGN_OUT_ERROR],
  promise: () => api.post('/logout')
})

export const loadUser = () => ({
  types: [LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_ERROR],
  promise: () => api.get('/me')
})

export const unauthorized = () => ({
  type: UNAUTHORIZED_ERROR
})
