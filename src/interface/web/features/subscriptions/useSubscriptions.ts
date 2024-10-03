import { useQuery, useQueryClient, useMutation, QueryFunctionContext } from '@tanstack/react-query'

import { SubscriptionsDto } from '@dto'
import * as api from '@web/services/api'
import ApiError from '@web/services/api/ApiError'
import useMessages from '@web/features/messages/useMessages'

interface Filters {
  page: string
}

const initialState: SubscriptionsDto = {
  items: [],
  pager: {
    count: 0,
    offset: 0,
    limit: 0,
    totalPages: 0,
    first: 0,
    prev: 0,
    next: 0,
    last: 0
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

  return useMutation({
    mutationFn: (id: number) => api.deleteSubscription(id),
    onSuccess(data, id) {
      const subscriptions = queryClient.getQueryData<SubscriptionsDto>([CACHE_KEY_LIST, filters])

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
 */
export const useSubscriptions = (filters: Filters = { page: '1' }, options = {}) => {
  const getSubscriptions = async ({ signal }: QueryFunctionContext) =>
    await api.getSubscriptions(filters.page, { signal })

  const queryOptions = {
    placeholderData: initialState,
    throwOnError: (err: ApiError) => {
      // do not throw error for 404 in order to manage redirection in views
      if ([404, 400].includes(err.response.status)) {
        return false
      }
      return true
    },
    ...options
  }

  return useQuery({ queryKey: [CACHE_KEY_LIST, filters], queryFn: getSubscriptions, ...queryOptions })
}
