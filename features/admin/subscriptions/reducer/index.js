import Router from 'next/router'

import { createResourceManager } from '@services/resources/reducer'
import {
  displaySuccessMessage,
  displayErrorMessage
} from '@services/messages/reducer'
import { getSubscriptions, deleteSubscription } from '@services/api'

const SubscriptionsResourceManager = createResourceManager({
  actions: {
    loadResources: {
      action: getSubscriptions
    },
    deleteResource: {
      action: deleteSubscription,
      onSuccess: () => {
        displaySuccessMessage({
          message: 'Your subscription has been deleted successfully',
          key: 'CRUD_SUBSCRIPTION'
        })
        navigateToList({ root: true })
      },
      onError: () => {
        displayErrorMessage({
          message: 'An error has occured during the deletion. Please retry',
          key: 'CRUD_SUBSCRIPTION'
        })
        navigateToList()
      }
    }
  }
})

function navigateToList({ root = false } = {}) {
  const _query = {}

  if (!root && Router.router.query.page) {
    _query['page'] = Router.router.query.page
  }

  Router.push({ pathname: '/admin/subscriptions', query: _query })

  window.scrollTo(0, 0)
}

export const ACTION_TYPES = {
  DELETE: 'delete_subscription'
}

export const {
  Provider: SubscriptionsProvider,
  useReducer: useSubscriptionsReducer,
  INITIAL_STATE
} = SubscriptionsResourceManager
