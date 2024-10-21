// @ts-nocheck
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { usePhotos, usePhoto, useCreatePhoto, useDeletePhoto, useEditPhoto } from './usePhotos'
import { MessagesProvider } from '../messages/useMessages'

import * as api from '@web/services/api'

describe('usePhotos', () => {
  const FILTERS = { page: '1' }

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false
      }
    }
  })

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <MessagesProvider>{children}</MessagesProvider>
    </QueryClientProvider>
  )

  const bindApiError = (method: keyof typeof api) => {
    jest
      .spyOn(api, method)
      .mockImplementation(() => new Promise((resolve, reject) => reject(new Error('Server error'))))
  }

  beforeEach(() => {
    jest.spyOn(api, 'getPhotos').mockImplementation(() => new Promise((resolve) => resolve(global.__PHOTOS__)))

    jest.spyOn(api, 'getPhoto').mockImplementation(() => new Promise((resolve) => resolve(global.__PHOTO__)))

    jest.spyOn(api, 'deletePhoto').mockImplementation((id) => new Promise((resolve) => resolve({ id })))

    jest.spyOn(api, 'createPhoto').mockImplementation((photo) => new Promise((resolve) => resolve(photo)))

    jest.spyOn(api, 'editPhoto').mockImplementation((id, photo) => new Promise((resolve) => resolve(photo)))
  })

  afterEach(() => {
    jest.clearAllMocks()
    queryClient.clear()
  })

  it('should init data', () => {
    const { result } = renderHook(() => usePhotos(FILTERS, { enabled: false }), { wrapper })

    expect(result.current.data).toEqual({
      items: [],
      pager: { count: 0, first: 0, last: 0, limit: 0, next: 0, offset: 0, prev: 0, totalPages: 0 }
    })
  })

  it('should load photos', async () => {
    const { result } = renderHook(() => usePhotos(FILTERS), { wrapper })

    await waitFor(() => expect(result.current.isFetching).toBeFalsy())

    expect(result.current.data).toEqual({
      items: global.__PHOTOS__.items,
      pager: global.__PHOTOS__.pager
    })
  })

  it('should delete photo', async () => {
    jest.spyOn(queryClient, 'invalidateQueries')

    const { result: resultQuery } = renderHook(() => usePhotos(FILTERS), { wrapper })

    await waitFor(() => expect(resultQuery.current.isFetching).toBeFalsy())

    const { result: resultMutation } = renderHook(() => useDeletePhoto(FILTERS), {
      wrapper
    })

    resultMutation.current.mutate(198)

    await waitFor(() => expect(queryClient.invalidateQueries).toHaveBeenCalledTimes(2))

    const calls = queryClient.invalidateQueries.mock.calls

    expect(calls[0][0]).toEqual({ queryKey: ['photo', 198] })
    expect(calls[1][0]).toEqual({ queryKey: ['photos'] })

    queryClient.invalidateQueries.mockRestore()
  })

  it('should not delete photo', async () => {
    const { result: resultQuery } = renderHook(() => usePhotos(FILTERS), { wrapper })

    await waitFor(() => expect(resultQuery.current.isFetching).toBeFalsy())

    bindApiError('deletePhoto')

    const { result: resultMutation } = renderHook(() => useDeletePhoto(FILTERS), {
      wrapper
    })

    resultMutation.current.mutate(198)

    await waitFor(() => expect(resultMutation.current.isError).toBeTruthy())

    expect(resultQuery.current.data.items).toHaveLength(2)
    expect(resultQuery.current.data.pager.count).toEqual(184)
  })

  it('should create photo', async () => {
    jest.spyOn(queryClient, 'invalidateQueries')
    jest.spyOn(queryClient, 'setQueryData')

    const { result: resultQuery } = renderHook(() => usePhotos(FILTERS), { wrapper })

    await waitFor(() => expect(resultQuery.current.isFetching).toBeFalsy())

    const { result: resultMutation } = renderHook(() => useCreatePhoto(FILTERS), {
      wrapper
    })

    resultMutation.current.mutate(global.__PHOTO__)

    await waitFor(() => expect(queryClient.invalidateQueries).toHaveBeenCalledTimes(1))

    expect(queryClient.invalidateQueries.mock.calls[0][0]).toEqual({ queryKey: ['photos'] })
    expect(queryClient.setQueryData.mock.calls[0][0]).toEqual(['photo', 1])
    expect(queryClient.setQueryData.mock.calls[0][1]).toEqual(global.__PHOTO__)

    queryClient.invalidateQueries.mockRestore()
    queryClient.setQueryData.mockRestore()
  })

  it('should not create photo', async () => {
    const { result: resultQuery } = renderHook(() => usePhotos(FILTERS), { wrapper })

    await waitFor(() => expect(resultQuery.current.isFetching).toBeFalsy())

    bindApiError('createPhoto')

    const { result: resultMutation } = renderHook(() => useCreatePhoto(FILTERS), {
      wrapper
    })

    resultMutation.current.mutate(global.__PHOTO__)

    await waitFor(() => expect(resultMutation.current.isError).toBeTruthy())

    expect(resultQuery.current.data.items).toHaveLength(2)
    expect(resultQuery.current.data.pager.count).toEqual(184)
  })

  it('should edit photo', async () => {
    const { result: resultQuery } = renderHook(() => usePhotos(FILTERS), { wrapper })

    await waitFor(() => expect(resultQuery.current.isFetching).toBeFalsy())

    const { result: resultMutation } = renderHook(() => useEditPhoto(FILTERS), {
      wrapper
    })

    resultMutation.current.mutate({ id: 198, data: global.__PHOTO__ })

    await waitFor(() => expect(resultQuery.current.data.items).toEqual([global.__PHOTOS__.items[0], global.__PHOTO__]))

    expect(resultQuery.current.data.items).toHaveLength(2)
    expect(resultQuery.current.data.pager.count).toEqual(184)
  })

  it('should not edit photo', async () => {
    const { result: resultQuery } = renderHook(() => usePhotos(FILTERS), { wrapper })

    await waitFor(() => expect(resultQuery.current.isFetching).toBeFalsy())

    bindApiError('editPhoto')

    const { result: resultMutation } = renderHook(() => useEditPhoto(FILTERS), {
      wrapper
    })

    resultMutation.current.mutate({ id: 198, data: global.__PHOTO__ })

    await waitFor(() => expect(resultMutation.current.isError).toBeTruthy())

    expect(resultQuery.current.data.items).toHaveLength(2)
    expect(resultQuery.current.data.pager.count).toEqual(184)
    expect(resultQuery.current.data.items).toEqual(global.__PHOTOS__.items)
  })

  it('should load photo from cache', async () => {
    const { result: resultQuery } = renderHook(() => usePhotos(FILTERS), { wrapper })

    await waitFor(() => expect(resultQuery.current.isFetching).toBeFalsy())

    const { result: resultPhoto } = renderHook(() => usePhoto(198, { enabled: false }), {
      wrapper
    })

    await waitFor(() => expect(resultPhoto.current.isSuccess).toBeTruthy())

    expect(resultPhoto.current.data.id).toEqual(198)
  })

  it('should load photo from server', async () => {
    const { result: resultQuery } = renderHook(() => usePhotos(FILTERS), { wrapper })

    await waitFor(() => expect(resultQuery.current.isFetching).toBeFalsy())

    const { result: resultPhoto } = renderHook(() => usePhoto(1), { wrapper })

    await waitFor(() => expect(resultPhoto.current.isSuccess).toBeTruthy())

    expect(resultPhoto.current.data.id).toEqual(1)
  })
})
