import { useQuery, useMutation, useQueryClient, QueryFunctionContext } from '@tanstack/react-query'

import * as api from '@services/api'
import { Photos, EnhancedPhoto } from '@models'
import useMessages from '@features/messages/useMessages'

interface Filters {
  page: string
}

const initialState: Photos = {
  items: [],
  pager: {
    count: 0
  }
}

const CACHE_KEY_LIST = 'photos'
const CACHE_KEY_DETAIL = 'photo'

/**
 * Edit photo
 * @param {object} filters
 * @returns
 */
export const useEditPhoto = (filters: Filters = { page: '1' }) => {
  const queryClient = useQueryClient()
  const [, { displaySuccessMessage, displayErrorMessage }] = useMessages()

  return useMutation({
    mutationFn: ({ id, data }: { id: EnhancedPhoto['id']; data: FormData }): Promise<EnhancedPhoto> =>
      api.editPhoto(id, data),
    onSuccess(photo, { id }) {
      queryClient.setQueryData([CACHE_KEY_DETAIL, id], photo)

      // https://github.com/tannerlinsley/react-query/issues/506
      const photos = queryClient.getQueryData<Photos>([CACHE_KEY_LIST, filters])

      if (photos) {
        queryClient.setQueryData([CACHE_KEY_LIST, filters], {
          ...photos,
          items: photos.items.map((_photo) => {
            if (_photo.id !== id) return _photo
            return photo
          })
        })
      }

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
export const useDeletePhoto = (filters: Filters = { page: '1' }) => {
  const queryClient = useQueryClient()
  const [, { displaySuccessMessage, displayErrorMessage }] = useMessages()

  return useMutation({
    mutationFn: (id: number) => api.deletePhoto(id),
    onSuccess(data, id) {
      const photos = queryClient.getQueryData<Photos>([CACHE_KEY_LIST, filters])

      if (photos) {
        queryClient.setQueryData([CACHE_KEY_LIST, filters], {
          items: photos.items.filter((photo) => photo.id !== id),
          pager: {
            ...photos.pager,
            count: photos.pager.count - 1
          }
        })
      }

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
export const useCreatePhoto = (filters: Filters = { page: '1' }) => {
  const queryClient = useQueryClient()
  const [, { displaySuccessMessage, displayErrorMessage }] = useMessages()

  return useMutation({
    mutationFn: (data: FormData): Promise<EnhancedPhoto> => api.createPhoto(data),
    onSuccess(photo) {
      if (filters.page === '1') {
        const photos = queryClient.getQueryData<Photos>([CACHE_KEY_LIST, filters])

        if (photos) {
          queryClient.setQueryData([CACHE_KEY_LIST, filters], {
            items: [photo, ...photos.items],
            pager: {
              ...photos.pager,
              count: photos.pager.count + 1
            }
          })
        }
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
 */
export const usePhotos = (filters: Filters = { page: '1' }, options = {}) => {
  const getPhotos = async ({ signal }: QueryFunctionContext) => {
    const response = await api.getPhotos(filters.page, { signal })
    return {
      ...response,
      items: response.items
    }
  }

  const queryOptions = {
    placeholderData: initialState,
    useErrorBoundary: true,
    ...options
  }

  return useQuery({ queryKey: [CACHE_KEY_LIST, filters], queryFn: getPhotos, ...queryOptions })
}

/**
 * Fetch photo
 */
export const usePhoto = (id: number, options = {}) => {
  const queryClient = useQueryClient()

  const getPhoto = async ({ signal }: QueryFunctionContext) => {
    const response = await api.getPhoto(id, { signal })
    return response
  }

  const getActivePhotoQuery = () => {
    const queries = queryClient.getQueriesData<Photos>({ type: 'active' })
    const photoQuery = queries.find(([filters]) => filters[0] === CACHE_KEY_LIST)
    return photoQuery
  }

  const queryOptions = {
    initialData: () => {
      const photoQuery = getActivePhotoQuery()
      if (photoQuery) {
        return photoQuery[1]?.items.find((photo) => photo.id === id)
      }
    },
    initialDataUpdatedAt: () => {
      const photoQuery = getActivePhotoQuery()
      if (photoQuery) {
        const cacheKey = photoQuery[0]
        return queryClient.getQueryState(cacheKey)?.dataUpdatedAt
      }
    },
    useErrorBoundary: true,
    ...options
  }

  return useQuery({ queryKey: [CACHE_KEY_DETAIL, id], queryFn: getPhoto, ...queryOptions })
}
