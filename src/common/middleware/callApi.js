// redux middleware to call api and manage errors

export default ({ dispatch, getState }) => {
  return next => action => {
    const config = getState().config

    const { types, promise, ...actionParams } = action

    // default redux action
    if (action.type) {
      return next(action)
    }

    if (
      !Array.isArray(types) ||
      types.length < 3
    ) {
      throw new Error('callAPIMiddleware: types must be an array of 3 values')
    }

    if (!promise) {
      throw new Error('callAPIMiddleware: missing promise')
    }

    const [ TYPE_REQUEST, TYPE_SUCCESS, TYPE_ERROR ] = types

    dispatch({ type: TYPE_REQUEST, ...actionParams })

    return promise()
      .then(response => {
        // const response = await response.json()
        return dispatch({
          type: TYPE_SUCCESS,
          response: response.data,
          ...actionParams,
        })
      })
      .catch(err => {
        return dispatch({
          type: TYPE_ERROR,
          status: err.response && err.response.status,
          error: err.response && err.response.data,
          ...actionParams,
        })
      })
  }
}