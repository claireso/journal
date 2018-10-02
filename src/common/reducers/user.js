import * as actionTypes from '../actions/user'

const initialState = {
  isLogin: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_USER_SUCCESS: {
      return {
        ...state,
        ...action.response
      }
    }

    case actionTypes.LOGIN_REQUEST: {
      return {
        ...state,
        isLogin: true,
      }
    }

    case actionTypes.LOGIN_SUCCESS:
    case actionTypes.LOGIN_ERROR: {
      return {
        ...state,
        isLogin: false,
      }
    }

    default:
      return state
  }
}
