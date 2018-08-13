import * as actionTypes from '../actions/user'

const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_USER_SUCCESS: {
      return {
        ...state,
        ...action.response
      }
    }

    default:
      return state
  }
}
