/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { renderHook, act } from '@testing-library/react-hooks'

import useSubscriptions, { SubscriptionsProvider } from './useSubscriptions'
import { MessagesProvider } from '../messages/useMessages'

import * as api from '@services/api'

describe('useSubscriptions', () => {
  const render = (context = {}) =>
    renderHook(() => useSubscriptions(), {
      wrapper: ({ children }) => (
        <MessagesProvider>
          <SubscriptionsProvider value={context.subscriptions}>{children}</SubscriptionsProvider>
        </MessagesProvider>
      )
    })

  const renderWithSubscriptions = () =>
    render({
      subscriptions: {
        subscriptions: global.__SUBSCRIPTIONS__,
        isLoading: false,
        isProcessing: false,
        detail: null
      }
    })

  const bindApiError = (method) => {
    jest.spyOn(api, method).mockImplementation(() => ({
      ready: new Promise((resolve, reject) => reject(new Error('Server error')))
    }))
  }

  beforeEach(() => {
    jest.spyOn(api, 'getSubscriptions').mockImplementation(() => ({
      ready: new Promise((resolve) => resolve(global.__SUBSCRIPTIONS__))
    }))

    jest.spyOn(api, 'deleteSubscription').mockImplementation((id) => ({
      ready: new Promise((resolve) => resolve({ id }))
    }))
  })

  it('should display error `missing MessagesProvider`', () => {
    const { result } = renderHook(() => useSubscriptions())

    expect(result.error.message).toEqual('useMessagesContext must be used within a MessagesProvider')
  })

  it('should display error `missing SubscriptionsProvider`', () => {
    const { result } = renderHook(() => useSubscriptions(), {
      wrapper: ({ children }) => <MessagesProvider>{children}</MessagesProvider>
    })

    expect(result.error.message).toEqual('useSubscriptionsContext must be used within a SubscriptionsProvider')
  })

  it('should init reducer', () => {
    const { result } = render()

    const [reducer] = result.current

    expect(reducer).toEqual({
      data: undefined,
      pager: undefined,
      isLoading: true,
      isProcessing: false
    })
  })

  it('should load subscriptions', async () => {
    const { result, waitForNextUpdate } = render()

    let [reducer, actions] = result.current

    actions.loadSubscriptions()

    await waitForNextUpdate()

    reducer = result.current[0]

    expect(reducer).toEqual({
      data: global.__SUBSCRIPTIONS__.items,
      pager: global.__SUBSCRIPTIONS__.pager,
      isLoading: false,
      isProcessing: false
    })
  })

  it('should not load subscriptions', async () => {
    bindApiError('getSubscriptions')

    const { result, waitForNextUpdate } = render()

    let [reducer, actions] = result.current

    actions.loadSubscriptions()

    await waitForNextUpdate()

    reducer = result.current[0]

    expect(reducer).toEqual({
      data: undefined,
      pager: undefined,
      isLoading: false,
      isProcessing: false
    })
  })

  it('should delete subscription', async () => {
    const { result, waitForValueToChange } = renderWithSubscriptions()

    let [reducer, actions] = result.current

    act(() => {
      actions.deleteSubscription(118)
    })

    await waitForValueToChange(() => {
      return result.current[0].pager.count
    })

    reducer = result.current[0]

    expect(reducer).toEqual({
      data: [],
      pager: {
        ...global.__SUBSCRIPTIONS__.pager,
        count: 183
      },
      isLoading: false,
      isProcessing: false
    })
  })

  it('should not delete subscription', async () => {
    bindApiError('deleteSubscription')

    const { result, waitForValueToChange } = renderWithSubscriptions()

    let [reducer, actions] = result.current

    act(() => {
      actions.deleteSubscription(118)
    })

    await waitForValueToChange(() => {
      return result.current[0].isProcessing
    })

    reducer = result.current[0]

    expect(reducer).toEqual({
      data: global.__SUBSCRIPTIONS__.items,
      pager: global.__SUBSCRIPTIONS__.pager,
      isLoading: false,
      isProcessing: false
    })
  })
})
