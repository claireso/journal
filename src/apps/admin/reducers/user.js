import { navigate } from '@reach/router'

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
        isLogin: true
      }
    }

    case actionTypes.LOGIN_SUCCESS:
    case actionTypes.LOGIN_ERROR: {
      return {
        ...state,
        isLogin: false
      }
    }

    case actionTypes.UNAUTHORIZED_ERROR: {
      const pathname = window.location.pathname

      if (pathname !== '/admin/login') {
        const next = encodeURIComponent(pathname)
        navigate(`/admin/login?next=${next}`)
      }

      return state
    }

    case actionTypes.SIGN_OUT_SUCCESS: {
      return {
        ...state,
        cid: undefined
      }
    }
    default:
      return state
  }
}
