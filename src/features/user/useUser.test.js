/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { renderHook, act } from '@testing-library/react'
import Router from 'next/router'

import useUser, { UserProvider } from './useUser'

import * as api from '@services/api'

describe('useUser', () => {
  const render = () =>
    renderHook(() => useUser(), {
      wrapper: ({ children }) => <UserProvider>{children}</UserProvider>
    })

  const bindApiError = (method, err = {}) => {
    jest.spyOn(api, method).mockImplementation(
      () =>
        new Promise((resolve, reject) => {
          const ApiError = api.getErrorConstructor()
          reject(new ApiError(err))
        })
    )
  }

  beforeEach(() => {
    jest.spyOn(api, 'getMe').mockImplementation(() => new Promise((resolve) => resolve(global.__USER__)))
    jest.spyOn(api, 'login').mockImplementation(() => new Promise((resolve) => resolve()))
    jest.spyOn(api, 'logout').mockImplementation(() => new Promise((resolve) => resolve()))

    Router.push = jest.fn()
    jest.spyOn(window, 'alert')
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should init reducer', () => {
    const { result } = render()

    const [reducer] = result.current

    expect(reducer).toEqual({
      isLoading: true,
      isProcessing: false,
      user: null
    })
  })

  it('should get authenticated user', async () => {
    const { result } = render()

    let [reducer, actions] = result.current

    await act(() => actions.getMe())

    reducer = result.current[0]

    expect(reducer).toEqual({
      user: { cid: 1 },
      isLoading: false,
      isProcessing: false
    })
  })

  it('should not get authenticated user', async () => {
    bindApiError('getMe')

    const { result } = render()

    let [reducer, actions] = result.current

    await act(() => actions.getMe())

    reducer = result.current[0]

    expect(reducer).toEqual({
      isLoading: false,
      isProcessing: false,
      user: null
    })
  })
})
