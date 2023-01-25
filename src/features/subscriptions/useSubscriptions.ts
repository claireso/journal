import { useQuery, useQueryClient, useMutation, QueryFunctionContext } from '@tanstack/react-query'

import * as api from '@services/api'
import useMessages from '@features/messages/useMessages'

interface Filters {
  page: string
}

const initialState: Subscriptions = {
  items: [],
  pager: {
    count: 0
  }
}

const CACHE_KEY_LIST = 'subscriptions'

/**
 * Delete subscription and update cache
 * @returns object
 */
export const useDeleteSubscription = (filters: Filters) => {
  const queryClient = useQueryClient()
  const [, { displaySuccessMessage, displayErrorMessage }] = useMessages()

  return useMutation((id: number) => api.deleteSubscription(id), {
    onSuccess(data, id) {
      const subscriptions = queryClient.getQueryData<Subscriptions>([CACHE_KEY_LIST, filters])

      if (subscriptions) {
        queryClient.setQueryData([CACHE_KEY_LIST, filters], {
          items: subscriptions.items.filter((subscription) => subscription.id !== id),
          pager: {
            ...subscriptions.pager,
            count: subscriptions.pager.count - 1
          }
        })
      }

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
export const useSubscriptions = (filters: Filters = { page: '1' }, options = {}) => {
  const getSubscriptions = async ({ signal }: QueryFunctionContext) => {
    const response = await api.getSubscriptions(filters.page, { signal })
    return response
  }

  const queryOptions = {
    placeholderData: initialState,
    ...options
  }

  return useQuery([CACHE_KEY_LIST, filters], getSubscriptions, queryOptions)
}
