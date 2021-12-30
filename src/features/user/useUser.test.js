/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { renderHook, act } from '@testing-library/react-hooks'
import Router from 'next/router'

import useUser, { UserProvider } from './useUser'

import * as api from '@services/api'

describe('useUser', () => {
  const render = () =>
    renderHook(() => useUser(), {
      wrapper: ({ children }) => <UserProvider>{children}</UserProvider>
    })

  const bindApiError = (method, err = {}) => {
    jest.spyOn(api, method).mockImplementation(() => ({
      ready: new Promise((resolve, reject) => reject(err))
    }))
  }

  beforeEach(() => {
    jest.spyOn(api, 'getMe').mockImplementation(() => ({
      ready: new Promise((resolve) => resolve(global.__USER__))
    }))

    jest.spyOn(api, 'login').mockImplementation(() => ({
      ready: new Promise((resolve) => resolve())
    }))

    jest.spyOn(api, 'logout').mockImplementation(() => ({
      ready: new Promise((resolve) => resolve())
    }))

    Router.push = jest.fn()
    jest.spyOn(window, 'alert')
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should display error `missing UserProvider`', () => {
    const { result } = renderHook(() => useUser())

    expect(result.error.message).toEqual('useUserContext must be used within a UserProvider')
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
    const { result, waitForNextUpdate } = render()

    let [reducer, actions] = result.current

    actions.getMe()

    await waitForNextUpdate()

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

    await act(async () => {
      await actions.getMe()
    })

    reducer = result.current[0]

    expect(reducer).toEqual({
      isLoading: false,
      isProcessing: false
    })
  })

  it('should log in user', async () => {
    const { result, waitForNextUpdate } = render()

    let [reducer, actions] = result.current

    act(() => {
      actions.login()
    })

    await waitForNextUpdate()

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
    bindApiError('login', { response: { status: 401 } })

    const { result, waitForNextUpdate } = render()

    let [reducer, actions] = result.current

    act(() => {
      actions.login()
    })

    await waitForNextUpdate()

    reducer = result.current[0]

    expect(reducer).toEqual({ isLoading: true, isProcessing: false })
    expect(Router.push).not.toHaveBeenCalled()
    expect(alert).toHaveBeenCalledWith('Bad username/password. Please retry')
  })

  it('should not log in user (error 422)', async () => {
    bindApiError('login', { response: { status: 422 } })

    const { result, waitForNextUpdate } = render()

    let [reducer, actions] = result.current

    act(() => {
      actions.login()
    })

    await waitForNextUpdate()

    reducer = result.current[0]

    expect(reducer).toEqual({ isLoading: true, isProcessing: false })
    expect(Router.push).not.toHaveBeenCalled()
    expect(alert).toHaveBeenCalledWith('Bad username/password. Please retry')
  })

  it('should not log in user (error 500)', async () => {
    bindApiError('login', { response: { status: 500 } })

    const { result, waitForNextUpdate } = render()

    let [reducer, actions] = result.current

    act(() => {
      actions.login()
    })

    await waitForNextUpdate()

    reducer = result.current[0]

    expect(reducer).toEqual({ isLoading: true, isProcessing: false })
    expect(Router.push).not.toHaveBeenCalled()
    expect(alert).not.toHaveBeenCalled()
  })

  it('should log out user', async () => {
    const { result, waitForNextUpdate } = render()

    let [reducer, actions] = result.current

    act(() => {
      actions.login()
    })

    await waitForNextUpdate()

    reducer = result.current[0]
    actions = result.current[1]

    expect(reducer).toEqual({
      user: { cid: 1 },
      isLoading: true,
      isProcessing: false
    })

    act(() => {
      actions.logout()
    })

    await waitForNextUpdate()

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
    const { result, waitForNextUpdate } = render()

    let [reducer, actions] = result.current

    act(() => {
      actions.login()
    })

    await waitForNextUpdate()

    reducer = result.current[0]
    actions = result.current[1]

    expect(reducer).toEqual({
      user: { cid: 1 },
      isLoading: true,
      isProcessing: false
    })

    await act(async () => {
      await actions.logout()
    })

    reducer = result.current[0]

    expect(reducer).toEqual({
      user: { cid: 1 },
      isLoading: true,
      isProcessing: false
    })

    expect(Router.push).toHaveBeenCalledWith('/admin/login')
  })
})
