import { navigate } from '@reach/router'

import * as actionTypes from '../actions/api'

const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UNAUTHORIZED_ERROR: {
      navigate('/admin/login')
      return state
    }

    default:
      return state
  }
}
