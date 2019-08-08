export const TYPES = {
  SET_LOADING: 'SET_LOADING',
  GET_PHOTOS_SUCCESS: 'GET_PHOTOS_SUCCESS'
}

export default (state, action) => {
  switch (action.type) {
    case TYPES.SET_LOADING:
      return { ...state, isLoading: action.isLoading }

    case TYPES.GET_PHOTOS_SUCCESS:
      return { ...state, ...action.response }

    default:
      return { ...state }
  }
}
