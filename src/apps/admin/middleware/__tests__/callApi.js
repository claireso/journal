import callApi from '../callApi'

describe('callApi middleware', () => {
  test('should return action', () => {
    const spy = jest.fn()
    const action = {
      type: 'LOAD_DATA'
    }

    callApi({})(spy)(action)

    expect(spy).toBeCalledWith({ type: 'LOAD_DATA' })
  })

  test('should throw error', () => {
    const spy = jest.fn()
    let action = {
      types: ['LOAD_DATA_REQUEST', 'LOAD_DATA_SUCCESS']
    }

    expect(() => callApi({})(spy)(action)).toThrowError(
      'callAPIMiddleware: types must be an array of 3 values'
    )

    action = {
      types: 'LOAD_DATA_REQUEST'
    }

    expect(() => callApi({})(spy)(action)).toThrowError(
      'callAPIMiddleware: types must be an array of 3 values'
    )

    action = {
      types: ['LOAD_DATA_REQUEST', 'LOAD_DATA_SUCCESS', 'LOAD_DATA_ERROR']
    }

    expect(() => callApi({})(spy)(action)).toThrowError(
      'callAPIMiddleware: missing promise'
    )
  })

  test('should dispatch success action', async () => {
    const spy = jest.fn()
    const action = {
      types: ['LOAD_DATA_REQUEST', 'LOAD_DATA_SUCCESS', 'LOAD_DATA_ERROR'],
      promise: () => Promise.resolve({ data: { id: 1 } })
    }

    await callApi({ dispatch: spy })(() => {})(action)

    expect(spy).toHaveBeenCalledTimes(2)
    expect(spy).toHaveBeenNthCalledWith(1, { type: 'LOAD_DATA_REQUEST' })
    expect(spy).toHaveBeenNthCalledWith(2, {
      type: 'LOAD_DATA_SUCCESS',
      response: { id: 1 }
    })
  })

  test('should dispatch error action (default error)', async () => {
    const spy = jest.fn()
    const action = {
      types: ['LOAD_DATA_REQUEST', 'LOAD_DATA_SUCCESS', 'LOAD_DATA_ERROR'],
      promise: () =>
        Promise.reject({
          response: { status: 422, data: { message: 'error api' } }
        })
    }

    await callApi({ dispatch: spy })(() => {})(action)

    expect(spy).toHaveBeenCalledTimes(2)
    expect(spy).toHaveBeenNthCalledWith(1, { type: 'LOAD_DATA_REQUEST' })
    expect(spy).toHaveBeenNthCalledWith(2, {
      type: 'LOAD_DATA_ERROR',
      status: 422,
      error: { message: 'error api' }
    })
  })

  test('should dispatch unauthorized error', async () => {
    const spy = jest.fn()
    const action = {
      types: ['LOAD_DATA_REQUEST', 'LOAD_DATA_SUCCESS', 'LOAD_DATA_ERROR'],
      promise: () => Promise.reject({ response: { status: 401 } })
    }

    await callApi({ dispatch: spy })(() => {})(action)

    expect(spy).toHaveBeenCalledTimes(3)
    expect(spy).toHaveBeenNthCalledWith(1, { type: 'LOAD_DATA_REQUEST' })
    expect(spy).toHaveBeenNthCalledWith(2, { type: 'LOAD_DATA_ERROR' })
    expect(spy).toHaveBeenNthCalledWith(3, { type: 'UNAUTHORIZED_ERROR' })
  })

  test('should dispatch internal server error', async () => {
    const spy = jest.fn()
    const action = {
      types: ['LOAD_DATA_REQUEST', 'LOAD_DATA_SUCCESS', 'LOAD_DATA_ERROR'],
      promise: () => Promise.reject({ response: { status: 500 } })
    }

    await callApi({ dispatch: spy })(() => {})(action)

    expect(spy).toHaveBeenCalledTimes(3)
    expect(spy).toHaveBeenNthCalledWith(1, { type: 'LOAD_DATA_REQUEST' })
    expect(spy).toHaveBeenNthCalledWith(2, { type: 'LOAD_DATA_ERROR' })
    expect(spy).toHaveBeenNthCalledWith(3, {
      type: 'ADD_MESSAGE',
      status: 'error',
      message: 'An error has occured, please retry',
      key: undefined
    })
  })
})
