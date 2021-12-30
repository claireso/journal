import React, { useState, useContext, useCallback } from 'react'
import PropTypes from 'prop-types'

import * as api from '@services/api'
import useMessages from '@features/messages/useMessages'

let currentRequest = null

const SubscriptionsContext = React.createContext()

const initialState = {
  subscriptions: {},
  isLoading: true,
  isProcessing: false
}

const useSubscriptionsContext = () => {
  const context = useContext(SubscriptionsContext)

  if (context === undefined) {
    throw new Error('useSubscriptionsContext must be used within a SubscriptionsProvider')
  }

  return context
}

export const SubscriptionsProvider = ({ value = initialState, children }) => {
  const [state, setState] = useState(value)

  return <SubscriptionsContext.Provider value={[state, setState]}>{children}</SubscriptionsContext.Provider>
}

SubscriptionsProvider.propTypes = {
  children: PropTypes.any,
  value: PropTypes.object
}

const useSubscriptions = () => {
  const [, { displaySuccessMessage, displayErrorMessage }] = useMessages()
  const [state, setState] = useSubscriptionsContext()
  const { subscriptions, isLoading, isProcessing } = state

  const updateState = (newState) => setState({ ...state, ...newState })

  const loadSubscriptions = useCallback(async (page = 1) => {
    if (currentRequest) {
      currentRequest.abort()
    }

    currentRequest = api.getSubscriptions(page)

    try {
      const response = await currentRequest.ready
      currentRequest = null
      updateState({
        subscriptions: {
          ...response
        },
        isLoading: false
      })
    } catch {
      updateState({ isLoading: false })
    }
  }, [])

  const deleteSubscription = useCallback(async (id) => {
    try {
      updateState({ isProcessing: true })
      await api.deleteSubscription(id).ready
      updateState({
        isProcessing: false,
        subscriptions: {
          items: subscriptions.items.filter((subscription) => subscription.id !== id),
          pager: {
            ...subscriptions.pager,
            count: subscriptions.pager.count - 1
          }
        }
      })
      displaySuccessMessage({
        message: 'Your subscription has been deleted successfully',
        key: 'CRUD_SUBSCRIPTION'
      })
    } catch {
      updateState({ isProcessing: false })
      displayErrorMessage({
        message: 'An error has occured during the deletion. Please retry',
        key: 'CRUD_SUBSCRIPTION'
      })
    }
  }, [])

  return [
    {
      data: subscriptions.items,
      pager: subscriptions.pager,
      isLoading,
      isProcessing
    },
    {
      loadSubscriptions,
      deleteSubscription
    }
  ]
}

export default useSubscriptions
