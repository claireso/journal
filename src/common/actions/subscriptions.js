import api from '../api'

export const LOAD_SUBSCRIPTIONS_REQUEST = 'LOAD_SUBSCRIPTIONS_REQUEST'
export const LOAD_SUBSCRIPTIONS_SUCCESS = 'LOAD_SUBSCRIPTIONS_SUCCESS'
export const LOAD_SUBSCRIPTIONS_ERROR = 'LOAD_SUBSCRIPTIONS_ERROR'

export const DELETE_SUBSCRIPTION_REQUEST = 'DELETE_SUBSCRIPTION_REQUEST'
export const DELETE_SUBSCRIPTION_SUCCESS = 'DELETE_SUBSCRIPTION_SUCCESS'
export const DELETE_SUBSCRIPTION_ERROR = 'DELETE_SUBSCRIPTION_ERROR'

export const loadSubscriptions = params => ({
  types: [
    LOAD_SUBSCRIPTIONS_REQUEST,
    LOAD_SUBSCRIPTIONS_SUCCESS,
    LOAD_SUBSCRIPTIONS_ERROR
  ],
  promise: () => api.get('/subscriptions', { params })
})

export const deleteSubscription = id => ({
  types: [
    DELETE_SUBSCRIPTION_REQUEST,
    DELETE_SUBSCRIPTION_SUCCESS,
    DELETE_SUBSCRIPTION_ERROR
  ],
  promise: () => api.del(`/subscriptions/${id}`),
  id
})
