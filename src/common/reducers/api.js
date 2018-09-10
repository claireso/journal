import { navigate } from '@reach/router'

import * as actionTypes from '../actions/api'

const initialState = {
  errors: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UNAUTHORIZED_ERROR: {
      const next = encodeURIComponent(window.location.pathname)
      navigate(`/admin/login?next=${next}`)
      return state
    }

    case actionTypes.INTERNAL_SERVER_ERROR: {
      return {
        ...state,
        errors: [...state.errors, action]
      }
    }

    case actionTypes.CLOSE_API_MESSAGE: {
      const index = state.errors.findIndex(err => err.type === action.key)

      if (index < 0) return state

      return {
        ...state,
        errors: [
          ...state.errors.slice(0, index),
          ...state.errors.slice(index + 1)
        ]
      }
    }

    default:
      return state
  }
}
