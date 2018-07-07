import * as actionsTypes from '../actions/photos'

const initialState = {
  items: [],
  pager: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.LOAD_PHOTOS_SUCCESS : {
      return {
        ...state,
        ...action.response,
      }
    }

    case actionsTypes.CREATE_PHOTO_SUCCESS: {
      return {
        ...state,
        items: [
          action.response,
          ...state.items,
        ],
        error: null,
      }
    }

    case actionsTypes.CREATE_PHOTO_ERROR: {
      return {
        ...state,
        error: {
          status: 'error',
          ...action.error,
        },
      }
    }

    default:
      return state
  }
}