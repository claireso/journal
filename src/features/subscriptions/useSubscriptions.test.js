/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
// import { renderHook } from '@testing-library/react-hooks'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import * as api from '@services/api'

import { useSubscriptions, useDeleteSubscription } from './useSubscriptions'
import { MessagesProvider } from '../messages/useMessages'
import ErrorBoundary from '@components/ErrorBoundary'

describe('useSubscriptions', () => {
  const FILTERS = { page: '1' }

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        cacheTime: Infinity
      }
    },
    logger: {
      log: console.log,
      warn: console.warn,
      error: () => {}
    }
  })

  const wrapper = ({ children }) => (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <MessagesProvider>{children}</MessagesProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  )

  const bindApiError = (method) => {
    jest
      .spyOn(api, method)
      .mockImplementation(() => new Promise((resolve, reject) => reject(new Error('Server error'))))
  }

  beforeEach(() => {
    jest
      .spyOn(api, 'getSubscriptions')
      .mockImplementation(() => new Promise((resolve) => resolve(global.__SUBSCRIPTIONS__)))

    jest.spyOn(api, 'deleteSubscription').mockImplementation((id) => new Promise((resolve) => resolve({ id })))
  })

  afterEach(() => {
    queryClient.clear()
  })

  it('should init data', () => {
    const { result } = renderHook(() => useSubscriptions(FILTERS, { enabled: false }), { wrapper })

    expect(result.current.data).toEqual({ items: [], pager: { count: 0 } })
  })

  it('should load subscriptions', async () => {
    const { result } = renderHook(() => useSubscriptions(FILTERS), { wrapper })

    await waitFor(() => expect(result.current.isFetching).toBeFalsy())

    expect(result.current.data).toEqual({
      items: global.__SUBSCRIPTIONS__.items,
      pager: global.__SUBSCRIPTIONS__.pager
    })
  })

  it('should delete subscription', async () => {
    const { result: resultQuery } = renderHook(() => useSubscriptions(FILTERS), { wrapper })

    await waitFor(() => expect(resultQuery.current.isFetching).toBeFalsy())

    expect(resultQuery.current.data.items).toHaveLength(1)
    expect(resultQuery.current.data.pager.count).toEqual(184)

    const { result: resultMutation } = renderHook(() => useDeleteSubscription(FILTERS), {
      wrapper
    })

    resultMutation.current.mutate(118)

    await waitFor(() => expect(resultMutation.current.isSuccess).toBeTruthy())

    expect(resultQuery.current.data.items).toHaveLength(0)
    expect(resultQuery.current.data.pager.count).toEqual(183)
  })

  it('should not delete subscription', async () => {
    const { result: resultQuery } = renderHook(() => useSubscriptions(FILTERS), { wrapper })

    await waitFor(() => expect(resultQuery.current.isFetching).toBeFalsy())

    expect(resultQuery.current.data.items).toHaveLength(1)
    expect(resultQuery.current.data.pager.count).toEqual(184)

    bindApiError('deleteSubscription')

    const { result: resultMutation } = renderHook(() => useDeleteSubscription(FILTERS), {
      wrapper
    })

    resultMutation.current.mutate(118)

    await waitFor(() => expect(resultMutation.current.isError).toBeTruthy())

    expect(resultQuery.current.data.items).toHaveLength(1)
    expect(resultQuery.current.data.pager.count).toEqual(184)
  })
})
