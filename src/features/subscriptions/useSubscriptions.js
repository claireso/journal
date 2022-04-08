import { useQuery, useQueryClient, useMutation } from 'react-query'

import * as api from '@services/api'
import useMessages from '@features/messages/useMessages'

const initialState = {
  items: [],
  pager: {}
}

const CACHE_KEY_LIST = 'subscriptions'

/**
 * Delete subscription and update cache
 * @returns object
 */
export const useDeleteSubscription = (filters) => {
  const queryClient = useQueryClient()
  const [, { displaySuccessMessage, displayErrorMessage }] = useMessages()

  return useMutation((id) => api.deleteSubscription(id), {
    onSuccess(data, id) {
      queryClient.setQueryData([CACHE_KEY_LIST, filters], (subscriptions) => ({
        items: subscriptions.items.filter((subscription) => subscription.id !== id),
        pager: {
          ...subscriptions.pager,
          count: subscriptions.pager.count - 1
        }
      }))
      displaySuccessMessage({
        key: 'CRUD_SUBSCRIPTION',
        message: 'Your subscription has been deleted successfully'
      })
    },
    onError() {
      displayErrorMessage({
        key: 'CRUD_SUBSCRIPTION',
        message: 'An error has occured during the deletion. Please retry'
      })
    }
  })
}

/**
 * Fetch subscriptions
 * @param {object} queries
 * @param {object} options
 * @returns object
 */
export const useSubscriptions = (filters = { page: '1' }, options = {}) => {
  const getSubscriptions = async ({ signal }) => {
    const response = await api.getSubscriptions(filters.page, { signal })
    return response
  }

  const queryOptions = {
    placeholderData: initialState,
    useErrorBoundary: true,
    ...options
  }

  return useQuery([CACHE_KEY_LIST, filters], getSubscriptions, queryOptions)
}
