// redux middleware to call api and manage errors
import { unauthorized, internalServerError } from '../actions/api'

export default ({ dispatch }) => {
  return next => action => {
    const { types, promise, ...actionParams } = action

    // default redux action
    if (action.type) {
      return next(action)
    }

    if (!Array.isArray(types) || types.length < 3) {
      throw new Error('callAPIMiddleware: types must be an array of 3 values')
    }

    if (!promise) {
      throw new Error('callAPIMiddleware: missing promise')
    }

    const [TYPE_REQUEST, TYPE_SUCCESS, TYPE_ERROR] = types

    dispatch({ type: TYPE_REQUEST, ...actionParams })

    return promise()
      .then(response => {
        // const response = await response.json()
        return dispatch({
          type: TYPE_SUCCESS,
          response: response.data,
          ...actionParams
        })
      })
      .catch(err => {
        const status = err.response && err.response.status

        if (status === 401) {
          return dispatch(unauthorized())
        }

        if (status === 500) {
          return dispatch(internalServerError())
        }

        return dispatch({
          type: TYPE_ERROR,
          status: status,
          error: err.response && err.response.data,
          ...actionParams
        })
      })
  }
}
