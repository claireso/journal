import * as actionTypes from '../actions/subscriptions'

const initialState = {
  items: [],
  pager: null,
  isLoading: true
}

export default (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.LOAD_SUBSCRIPTIONS_REQUEST : {
      return {
        ...state,
        isLoading: true,
      }
    }

    case actionTypes.LOAD_SUBSCRIPTIONS_SUCCESS : {
      return {
        ...state,
        isLoading: false,
        ...action.response,
      }
    }

    case actionTypes.DELETE_SUBSCRIPTION_SUCCESS: {
      const index = state.items.findIndex(subscription => subscription.id === action.id)

      if (index < 0) return state

      return {
        ...state,
        items: [
          ...state.items.slice(0, index),
          ...state.items.slice(index + 1)
        ],
        pager: {
          ...state.pager,
          count: state.pager.count - 1,
        }
      }
    }

    default:
      return state
  }
}