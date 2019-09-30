import * as actionTypes from '../actions/messages'

const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INTERNAL_SERVER_ERROR: {
      return [...state, action]
    }

    case actionTypes.ADD_MESSAGE: {
      const message = action
      let index = state.length || 0

      if (message.key) {
        const messageToReplaceIndex = state.findIndex(
          mess => mess.key === message.key
        )

        if (messageToReplaceIndex > -1) {
          index = messageToReplaceIndex
        }
      }

      return [...state.slice(0, index), action, ...state.slice(index + 1)]
    }

    case actionTypes.CLOSE_MESSAGE: {
      const index = action.index

      return [...state.slice(0, index), ...state.slice(index + 1)]
    }

    case actionTypes.CLEAR_ALL_MESSAGES: {
      return []
    }

    default:
      return state
  }
}
