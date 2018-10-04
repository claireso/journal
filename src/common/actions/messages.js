export const ADD_MESSAGE = 'ADD_MESSAGE'
export const INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR'
export const CLOSE_MESSAGE = 'CLOSE_MESSAGE'

const displayMessage = status => ({ message, key }) => ({
  type: ADD_MESSAGE,
  status,
  key,
  message
})

export const displaySuccessMessage = displayMessage('success')
export const displayErrorMessage = displayMessage('error')

export const internalServerError = () =>
  displayErrorMessage({
    message: 'An error has occured, please retry'
  })

export const closeMessage = index => ({
  type: CLOSE_MESSAGE,
  index
})
