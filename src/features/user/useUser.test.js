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
      isProcessing: false
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
      isProcessing: false
    })
  })

  it('should log in user', async () => {
    const { result, waitForNextUpdate } = render()

    let [reducer, actions] = result.current

    await act(() => actions.login())

    reducer = result.current[0]

    expect(reducer).toEqual({
      user: { cid: 1 },
      isLoading: true,
      isProcessing: false
    })

    expect(Router.push).toHaveBeenCalledTimes(1)
    expect(Router.push).toHaveBeenCalledWith('/admin/photos')
  })

  it('should not log in user (error 401)', async () => {
    bindApiError('login', { status: 401 })

    const { result } = render()

    let [reducer, actions] = result.current

    await act(() => actions.login())

    reducer = result.current[0]

    expect(reducer).toEqual({ isLoading: true, isProcessing: false })
    expect(Router.push).not.toHaveBeenCalled()
    expect(alert).toHaveBeenCalledWith('Bad username/password. Please retry')
  })

  it('should not log in user (error 422)', async () => {
    bindApiError('login', { status: 422 })

    const { result } = render()

    let [reducer, actions] = result.current

    await act(() => actions.login())

    reducer = result.current[0]

    expect(reducer).toEqual({ isLoading: true, isProcessing: false })
    expect(Router.push).not.toHaveBeenCalled()
    expect(alert).toHaveBeenCalledWith('Bad username/password. Please retry')
  })

  it('should not log in user (error 500)', async () => {
    bindApiError('login', { status: 500 })

    const { result } = render()

    let [reducer, actions] = result.current

    await act(() => actions.login())

    reducer = result.current[0]

    expect(reducer).toEqual({ isLoading: true, isProcessing: false })
    expect(Router.push).not.toHaveBeenCalled()
    expect(alert).not.toHaveBeenCalled()
  })

  it('should log out user', async () => {
    const { result } = render()

    let [reducer, actions] = result.current

    await act(() => actions.login())

    reducer = result.current[0]
    actions = result.current[1]

    expect(reducer).toEqual({
      user: { cid: 1 },
      isLoading: true,
      isProcessing: false
    })

    await act(() => actions.logout())

    reducer = result.current[0]

    expect(reducer).toEqual({
      user: null,
      isLoading: true,
      isProcessing: false
    })

    expect(Router.push).toHaveBeenCalledWith('/admin/login')
  })

  it('should not log out user', async () => {
    bindApiError('logout')
    const { result } = render()

    let [reducer, actions] = result.current

    await act(() => actions.login())

    reducer = result.current[0]
    actions = result.current[1]

    expect(reducer).toEqual({
      user: { cid: 1 },
      isLoading: true,
      isProcessing: false
    })

    await act(() => actions.logout())

    reducer = result.current[0]

    expect(reducer).toEqual({
      user: { cid: 1 },
      isLoading: true,
      isProcessing: false
    })

    expect(Router.push).toHaveBeenCalledWith('/admin/login')
  })
})
