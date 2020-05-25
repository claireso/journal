import { useReducer, useCallback } from 'react'
import emitter from '@services/emitter'

const INITIAL_STATE = []

const ACTION_ADD_MESSAGE = 'messages/add'
const ACTION_CLOSE_MESSAGE = 'messages/remove'
const ACTION_CLOSE_ALL = 'messages/close_all'

function reducer(state, { type, ...message }) {
  switch (type) {
    case ACTION_ADD_MESSAGE: {
      let index = state.length

      if (message.key) {
        const newIndex = state.findIndex((m) => m.key === message.key)

        if (newIndex > -1) {
          index = newIndex
        }
      }

      return [...state.slice(0, index), message, ...state.slice(index + 1)]
    }

    case ACTION_CLOSE_MESSAGE: {
      const index = message.index

      return [...state.slice(0, index), ...state.slice(index + 1)]
    }

    case ACTION_CLOSE_ALL: {
      return []
    }

    default:
      return [...state]
  }
}

export const useMessagesReducer = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

  const displayMessage = useCallback(
    (message) => dispatch({ type: ACTION_ADD_MESSAGE, ...message }),
    [dispatch]
  )
  const closeMessage = useCallback(
    (index) => dispatch({ type: ACTION_CLOSE_MESSAGE, index }),
    [dispatch]
  )
  const closeAllMessages = useCallback(
    () => dispatch({ type: ACTION_CLOSE_ALL }),
    [dispatch]
  )

  return [state, { displayMessage, closeMessage, closeAllMessages }]
}

const displayMessage = (status) => (message) => {
  emitter.emit('feat/messages/add', {
    status,
    ...message
  })
}

export const displaySuccessMessage = displayMessage('success')
export const displayErrorMessage = displayMessage('error')
