import { useQuery, useMutation, useQueryClient } from 'react-query'

import * as api from '@services/api'
import useMessages from '@features/messages/useMessages'

const formatPhoto = (photo) => ({
  ...photo,
  source: `/uploads/${photo.name}`
})

const initialState = {
  items: [],
  pager: {}
}

const CACHE_KEY_LIST = 'photos'
const CACHE_KEY_DETAIL = 'photo'

/**
 * Edit photo
 * @param {object} filters
 * @returns
 */
export const useEditPhoto = (filters = {}) => {
  const queryClient = useQueryClient()
  const [, { displaySuccessMessage, displayErrorMessage }] = useMessages()

  return useMutation(({ id, data }) => api.editPhoto(id, data), {
    onSuccess(photo, { id }) {
      queryClient.setQueryData([CACHE_KEY_DETAIL, id], formatPhoto(photo))

      queryClient.setQueryData([CACHE_KEY_LIST, filters], (photos) => ({
        ...photos,
        items: photos.items.map((_photo) => {
          if (_photo.id !== id) return _photo
          return formatPhoto(photo)
        })
      }))

      displaySuccessMessage({
        key: 'CRUD_PHOTO',
        message: 'Your photo has been updated successfully'
      })
    },
    onError() {
      displayErrorMessage({
        key: 'CRUD_PHOTO',
        message: 'An error has occured during the deletion. Please retry'
      })
    }
  })
}

/**
 * Delete photo and update cache
 * @returns object
 */
export const useDeletePhoto = (filters) => {
  const queryClient = useQueryClient()
  const [, { displaySuccessMessage, displayErrorMessage }] = useMessages()

  return useMutation((id) => api.deletePhoto(id), {
    onSuccess(data, id) {
      queryClient.setQueryData([CACHE_KEY_LIST, filters], (photos) => ({
        items: photos.items.filter((photo) => photo.id !== id),
        pager: {
          ...photos.pager,
          count: photos.pager.count - 1
        }
      }))
      displaySuccessMessage({
        key: 'CRUD_PHOTO',
        message: 'Your photo has been deleted successfully'
      })
    },
    onError() {
      displayErrorMessage({
        key: 'CRUD_PHOTO',
        message: 'An error has occured during the deletion. Please retry'
      })
    }
  })
}

/**
 * Create photo and update cache
 * @returns object
 */
export const useCreatePhoto = (filters = {}) => {
  const queryClient = useQueryClient()
  const [, { displaySuccessMessage, displayErrorMessage }] = useMessages()

  return useMutation((data) => api.createPhoto(data), {
    onSuccess(photo) {
      if (filters.page === '1') {
        queryClient.setQueryData([CACHE_KEY_LIST, filters], (photos) => ({
          items: [formatPhoto(photo), ...photos.items],
          pager: {
            ...photos.pager,
            count: photos.pager.count + 1
          }
        }))
      }
      displaySuccessMessage({
        key: 'CRUD_PHOTO',
        message: 'Your photo has been created successfully'
      })
    },
    onError() {
      displayErrorMessage({
        key: 'CRUD_PHOTO',
        message: 'An error has occured during the creation. Please retry'
      })
    }
  })
}

/**
 * Fetch photos
 * @param {object} queries
 * @param {object} options
 * @returns object
 */
export const usePhotos = (filters = { page: '1' }, options = {}) => {
  const getPhotos = async ({ signal }) => {
    const response = await api.getPhotos(filters.page, { signal })
    return {
      ...response,
      items: response.items.map(formatPhoto)
    }
  }

  const queryOptions = {
    placeholderData: initialState,
    useErrorBoundary: true,
    ...options
  }

  return useQuery([CACHE_KEY_LIST, filters], getPhotos, queryOptions)
}

/**
 * Fetch photo
 * @param {number} id photoId
 * @param {object} options query option
 * @returns
 */
export const usePhoto = (id, options = {}) => {
  const queryClient = useQueryClient()

  const getPhoto = async ({ signal }) => {
    const response = await api.getPhoto(id, { signal })
    return formatPhoto(response)
  }

  const queryOptions = {
    initialData: () => {
      const queries = queryClient.getQueriesData({ active: true })
      const photoQuery = queries.find(([filters]) => filters[0] === CACHE_KEY_LIST)
      return photoQuery?.[1]?.items.find((photo) => photo.id === id)
    },
    initialDataUpdatedAt: () => queryClient.getQueryState({ active: true })?.dataUpdatedAt,
    useErrorBoundary: true,
    ...options
  }

  return useQuery([CACHE_KEY_DETAIL, id], getPhoto, queryOptions)
}
