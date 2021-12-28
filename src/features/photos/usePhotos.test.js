/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { renderHook, act } from '@testing-library/react-hooks'

import usePhotos, { PhotosProvider } from './usePhotos'
import { MessagesProvider } from '../messages/useMessages'

import * as api from '@services/api'

describe('usePhotos', () => {
  const render = (context = {}) =>
    renderHook(() => usePhotos(), {
      wrapper: ({ children }) => (
        <MessagesProvider>
          <PhotosProvider value={context.photos}>{children}</PhotosProvider>
        </MessagesProvider>
      )
    })

  const renderWithPhotos = () =>
    render({
      photos: {
        photos: {
          items: global.__PHOTOS__.items.map((photo) => ({ ...photo, source: `/uploads/${photo.source}` })),
          pager: global.__PHOTOS__.pager
        },
        isLoading: false,
        isProcessing: false,
        detail: null
      }
    })

  const formatPhoto = (photo) => ({
    ...photo,
    source: `/uploads/${photo.source}`
  })

  const bindApiError = (method) => {
    jest.spyOn(api, method).mockImplementation(() => ({
      ready: new Promise((resolve, reject) => reject(new Error('Server error')))
    }))
  }

  beforeEach(() => {
    jest.spyOn(api, 'getPhotos').mockImplementation(() => ({
      ready: new Promise((resolve) => resolve(global.__PHOTOS__))
    }))

    jest.spyOn(api, 'getPhoto').mockImplementation(() => ({
      ready: new Promise((resolve) => resolve(global.__PHOTO__))
    }))

    jest.spyOn(api, 'deletePhoto').mockImplementation((id) => ({
      ready: new Promise((resolve) => resolve({ id }))
    }))

    jest.spyOn(api, 'createPhoto').mockImplementation((photo) => ({
      ready: new Promise((resolve) => resolve(photo))
    }))

    jest.spyOn(api, 'editPhoto').mockImplementation((id, photo) => ({
      ready: new Promise((resolve) => resolve(photo))
    }))
  })

  it('should display error `missing MessagesProvider`', () => {
    const { result } = renderHook(() => usePhotos())

    expect(result.error.message).toEqual('useMessagesContext must be used within a MessagesProvider')
  })

  it('should display error `missing PhotosProvider`', () => {
    const { result } = renderHook(() => usePhotos(), {
      wrapper: ({ children }) => <MessagesProvider>{children}</MessagesProvider>
    })

    expect(result.error.message).toEqual('usePhotosContext must be used within a PhotosProvider')
  })

  it('should init reducer', () => {
    const { result } = render()

    const [reducer] = result.current

    expect(reducer).toEqual({
      data: undefined,
      pager: undefined,
      isLoading: true,
      isProcessing: false,
      detail: null
    })
  })

  it('should load photos', async () => {
    const { result, waitForNextUpdate } = render()

    let [reducer, actions] = result.current

    actions.loadPhotos()

    await waitForNextUpdate()

    reducer = result.current[0]

    expect(reducer).toEqual({
      data: global.__PHOTOS__.items.map(formatPhoto),
      pager: global.__PHOTOS__.pager,
      isLoading: false,
      isProcessing: false,
      detail: null
    })
  })

  it('should not load photos', async () => {
    bindApiError('getPhotos')

    const { result, waitForNextUpdate } = render()

    let [reducer, actions] = result.current

    actions.loadPhotos()

    await waitForNextUpdate()

    reducer = result.current[0]

    expect(reducer).toEqual({
      data: undefined,
      pager: undefined,
      isLoading: false,
      isProcessing: false,
      detail: null
    })
  })

  it('should delete photo', async () => {
    const { result, waitForValueToChange } = renderWithPhotos()

    let [reducer, actions] = result.current

    act(() => {
      actions.deletePhoto(198)
    })

    await waitForValueToChange(() => {
      return result.current[0].pager.count
    })

    reducer = result.current[0]

    expect(reducer).toEqual({
      data: [formatPhoto(global.__PHOTOS__.items[0])],
      pager: {
        ...global.__PHOTOS__.pager,
        count: 183
      },
      isLoading: false,
      isProcessing: false,
      detail: null
    })
  })

  it('should not delete photo', async () => {
    bindApiError('deletePhoto')

    const { result, waitForValueToChange } = renderWithPhotos()

    let [reducer, actions] = result.current

    act(() => {
      actions.deletePhoto(198)
    })

    await waitForValueToChange(() => {
      return result.current[0].isProcessing
    })

    reducer = result.current[0]

    expect(reducer).toEqual({
      data: global.__PHOTOS__.items.map(formatPhoto),
      pager: global.__PHOTOS__.pager,
      isLoading: false,
      isProcessing: false,
      detail: null
    })
  })

  it('should create photo', async () => {
    const { result, waitForValueToChange } = renderWithPhotos()

    let [reducer, actions] = result.current

    act(() => {
      actions.createPhoto(global.__PHOTO__)
    })

    await waitForValueToChange(() => {
      return result.current[0].pager.count
    })

    reducer = result.current[0]

    expect(reducer).toEqual({
      data: [formatPhoto(global.__PHOTO__), ...global.__PHOTOS__.items.map(formatPhoto)],
      pager: {
        ...global.__PHOTOS__.pager,
        count: 185
      },
      isLoading: false,
      isProcessing: false,
      detail: null
    })
  })

  it('should not create photo', async () => {
    bindApiError('createPhoto')

    const { result, waitForValueToChange } = renderWithPhotos()

    let [reducer, actions] = result.current

    act(() => {
      actions.createPhoto(global.__PHOTO__)
    })

    await waitForValueToChange(() => {
      return result.current[0].isProcessing
    })

    reducer = result.current[0]

    expect(reducer).toEqual({
      data: global.__PHOTOS__.items.map(formatPhoto),
      pager: global.__PHOTOS__.pager,
      isLoading: false,
      isProcessing: false,
      detail: null
    })
  })

  it('should edit photo', async () => {
    const { result, waitForValueToChange } = renderWithPhotos()

    let [reducer, actions] = result.current

    act(() => {
      actions.editPhoto(198, global.__PHOTO__)
    })

    await waitForValueToChange(() => {
      return result.current[0].data
    })

    reducer = result.current[0]

    expect(reducer).toEqual({
      data: [formatPhoto(global.__PHOTOS__.items[0]), formatPhoto(global.__PHOTO__)],
      pager: global.__PHOTOS__.pager,
      isLoading: false,
      isProcessing: false,
      detail: null
    })
  })

  it('should not edit photo', async () => {
    bindApiError('editPhoto')

    const { result, waitForValueToChange } = renderWithPhotos()

    let [reducer, actions] = result.current

    act(() => {
      actions.editPhoto(198, global.__PHOTO__)
    })

    await waitForValueToChange(() => {
      return result.current[0].isProcessing
    })

    reducer = result.current[0]

    expect(reducer).toEqual({
      data: global.__PHOTOS__.items.map(formatPhoto),
      pager: global.__PHOTOS__.pager,
      isLoading: false,
      isProcessing: false,
      detail: null
    })
  })

  it('should load photo', async () => {
    const { result, waitForNextUpdate } = renderWithPhotos()

    let [reducer, actions] = result.current

    actions.loadPhoto(199)

    await waitForNextUpdate()

    reducer = result.current[0]

    expect(reducer).toEqual({
      data: global.__PHOTOS__.items.map(formatPhoto),
      pager: global.__PHOTOS__.pager,
      isLoading: false,
      isProcessing: false,
      detail: formatPhoto(global.__PHOTO__)
    })
  })

  it('should not load photo', async () => {
    bindApiError('getPhoto')

    const { result, waitForNextUpdate } = renderWithPhotos()

    let [reducer, actions] = result.current

    actions.loadPhoto(199)

    await waitForNextUpdate()

    reducer = result.current[0]

    expect(reducer).toEqual({
      data: global.__PHOTOS__.items.map(formatPhoto),
      pager: global.__PHOTOS__.pager,
      isLoading: false,
      isProcessing: false,
      detail: null
    })
  })
})
