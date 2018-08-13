export const UNAUTHORIZED_ERROR = 'UNAUTHORIZED_ERROR'
export const INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR'
export const CLOSE_API_MESSAGE = 'CLOSE_API_MESSAGE'

export const unauthorized = () => ({
  type: UNAUTHORIZED_ERROR
})

export const internalServerError = () => ({
  type: INTERNAL_SERVER_ERROR,
  status: 'error',
  message: 'An error has occured, please retry'
})

export const closeMessage = type => ({
  type: CLOSE_API_MESSAGE,
  key: type
})
