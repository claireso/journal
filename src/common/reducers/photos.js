import * as actionTypes from '../actions/photos'

const initialState = {
  items: [],
  pager: null,
  isLoading: true,
  isProcessing: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_PHOTOS_REQUEST: {
      return {
        ...state,
        isLoading: true
      }
    }

    case actionTypes.LOAD_PHOTOS_SUCCESS: {
      return {
        ...state,
        ...action.response,
        isLoading: false
      }
    }

    case actionTypes.LOAD_PHOTO_SUCCESS: {
      return {
        ...state,
        detail: action.response
      }
    }

    case actionTypes.CREATE_PHOTO_REQUEST: {
      return {
        ...state,
        isProcessing: true
      }
    }

    case actionTypes.CREATE_PHOTO_SUCCESS: {
      return {
        ...state,
        items: [action.response, ...state.items],
        error: null,
        isProcessing: false
      }
    }

    case actionTypes.CREATE_PHOTO_ERROR: {
      const newState = {...state, isProcessing: false}

      if (action.error) {
        newState.error = action.error
      }

      return newState
    }

    case actionTypes.EDIT_PHOTO_REQUEST: {
      return {
        ...state,
        isProcessing: true
      }
    }

    case actionTypes.EDIT_PHOTO_SUCCESS: {
      const photo = action.response
      const index = state.items.findIndex(_photo => _photo.id === photo.id)

      if (index < 0) return { ...state, isProcessing: false }

      return {
        ...state,
        items: [
          ...state.items.slice(0, index),
          photo,
          ...state.items.slice(index + 1)
        ],
        isProcessing: false
      }
    }

    case actionTypes.EDIT_PHOTO_ERROR: {
      return {
        ...state,
        isProcessing: false
      }
    }

    case actionTypes.DELETE_PHOTO_REQUEST: {
      return {
        ...state,
        isProcessing: true
      }
    }

    case actionTypes.DELETE_PHOTO_SUCCESS: {
      const index = state.items.findIndex(photo => photo.id === action.id)

      if (index < 0) return { ...state, isProcessing: false }

      return {
        ...state,
        items: [
          ...state.items.slice(0, index),
          ...state.items.slice(index + 1)
        ],
        isProcessing: false
      }
    }

    case actionTypes.DELETE_PHOTO_ERROR: {
      return {
        ...state,
        isProcessing: false
      }
    }

    default:
      return state
  }
}
