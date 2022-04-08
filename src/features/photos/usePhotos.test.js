/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { renderHook } from '@testing-library/react-hooks'
import { QueryClient, QueryClientProvider } from 'react-query'

import { usePhotos, usePhoto, useCreatePhoto, useDeletePhoto, useEditPhoto } from './usePhotos'
import { MessagesProvider } from '../messages/useMessages'
import ErrorBoundary from '@components/ErrorBoundary'

import * as api from '@services/api'

describe('usePhotos', () => {
  const FILTERS = { page: '1' }

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        cacheTime: Infinity
      }
    }
  })

  const wrapper = ({ children }) => (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <MessagesProvider>{children}</MessagesProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  )

  const formatPhoto = (photo) => ({
    ...photo,
    source: `/uploads/${photo.source}`
  })

  const bindApiError = (method) => {
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

    expect(result.current.data).toEqual({ items: [], pager: {} })
  })

  it('should load photos', async () => {
    const { result, waitFor } = renderHook(() => usePhotos(FILTERS), { wrapper })

    await waitFor(() => !result.current.isFetching)

    expect(result.current.data).toEqual({
      items: global.__PHOTOS__.items.map(formatPhoto),
      pager: global.__PHOTOS__.pager
    })
  })

  it('should delete photo', async () => {
    const { result: resultQuery, waitFor: waitForQuery } = renderHook(() => usePhotos(FILTERS), { wrapper })

    await waitForQuery(() => !resultQuery.current.isFetching)

    const { result: resultMutation, waitFor: waitForMutation } = renderHook(() => useDeletePhoto(FILTERS), {
      wrapper
    })

    resultMutation.current.mutate(198)

    await waitForMutation(() => resultMutation.current.isSuccess)

    expect(resultQuery.current.data.items).toHaveLength(1)
    expect(resultQuery.current.data.items[0].id).not.toEqual(198)
    expect(resultQuery.current.data.pager.count).toEqual(183)
  })

  it('should not delete photo', async () => {
    const { result: resultQuery, waitFor: waitForQuery } = renderHook(() => usePhotos(FILTERS), { wrapper })

    await waitForQuery(() => !resultQuery.current.isFetching)

    bindApiError('deletePhoto')

    const { result: resultMutation, waitFor: waitForMutation } = renderHook(() => useDeletePhoto(FILTERS), {
      wrapper
    })

    resultMutation.current.mutate(198)

    await waitForMutation(() => resultMutation.current.isError)

    expect(resultQuery.current.data.items).toHaveLength(2)
    expect(resultQuery.current.data.pager.count).toEqual(184)
  })

  it('should create photo', async () => {
    const { result: resultQuery, waitFor: waitForQuery } = renderHook(() => usePhotos(FILTERS), { wrapper })

    await waitForQuery(() => !resultQuery.current.isFetching)

    const { result: resultMutation, waitFor: waitForMutation } = renderHook(() => useCreatePhoto(FILTERS), {
      wrapper
    })

    resultMutation.current.mutate(global.__PHOTO__)

    await waitForMutation(() => resultMutation.current.isSuccess)

    expect(resultQuery.current.data.items).toHaveLength(3)
    expect(resultQuery.current.data.items[0]).toEqual(formatPhoto(global.__PHOTO__))
    expect(resultQuery.current.data.pager.count).toEqual(185)
  })

  it('should not create photo', async () => {
    const { result: resultQuery, waitFor: waitForQuery } = renderHook(() => usePhotos(FILTERS), { wrapper })

    await waitForQuery(() => !resultQuery.current.isFetching)

    bindApiError('createPhoto')

    const { result: resultMutation, waitFor: waitForMutation } = renderHook(() => useCreatePhoto(FILTERS), {
      wrapper
    })

    resultMutation.current.mutate(global.__PHOTO__)

    await waitForMutation(() => resultMutation.current.isError)

    expect(resultQuery.current.data.items).toHaveLength(2)
    expect(resultQuery.current.data.pager.count).toEqual(184)
  })

  it('should edit photo', async () => {
    const { result: resultQuery, waitFor: waitForQuery } = renderHook(() => usePhotos(FILTERS), { wrapper })

    await waitForQuery(() => !resultQuery.current.isFetching)

    const { result: resultMutation, waitFor: waitForMutation } = renderHook(() => useEditPhoto(FILTERS), {
      wrapper
    })

    resultMutation.current.mutate({ id: 198, data: global.__PHOTO__ })

    await waitForMutation(() => resultMutation.current.isSuccess)

    expect(resultQuery.current.data.items).toHaveLength(2)
    expect(resultQuery.current.data.pager.count).toEqual(184)
    expect(resultQuery.current.data.items).toEqual([
      formatPhoto(global.__PHOTOS__.items[0]),
      formatPhoto(global.__PHOTO__)
    ])
  })

  it('should not edit photo', async () => {
    const { result: resultQuery, waitFor: waitForQuery } = renderHook(() => usePhotos(FILTERS), { wrapper })

    await waitForQuery(() => !resultQuery.current.isFetching)

    bindApiError('editPhoto')

    const { result: resultMutation, waitFor: waitForMutation } = renderHook(() => useEditPhoto(FILTERS), {
      wrapper
    })

    resultMutation.current.mutate({ id: 198, data: global.__PHOTO__ })

    await waitForMutation(() => resultMutation.current.isError)

    expect(resultQuery.current.data.items).toHaveLength(2)
    expect(resultQuery.current.data.pager.count).toEqual(184)
    expect(resultQuery.current.data.items).toEqual(global.__PHOTOS__.items.map(formatPhoto))
  })

  it('should load photo from cache', async () => {
    const { result: resultQuery, waitFor: waitForQuery } = renderHook(() => usePhotos(FILTERS), { wrapper })

    await waitForQuery(() => !resultQuery.current.isFetching)

    const { result: resultPhoto, waitFor: waitForPhoto } = renderHook(() => usePhoto(198, { enabled: false }), {
      wrapper
    })

    await waitForPhoto(() => resultPhoto.current.isSuccess)

    expect(resultPhoto.current.data.id).toEqual(198)
  })

  it('should load photo from server', async () => {
    const { result: resultQuery, waitFor: waitForQuery } = renderHook(() => usePhotos(FILTERS), { wrapper })

    await waitForQuery(() => !resultQuery.current.isFetching)

    const { result: resultPhoto, waitFor: waitForPhoto } = renderHook(() => usePhoto(1), { wrapper })

    await waitForPhoto(() => resultPhoto.current.isSuccess)

    expect(resultPhoto.current.data.id).toEqual(1)
  })
})
