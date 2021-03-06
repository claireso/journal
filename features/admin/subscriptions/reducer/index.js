import Router from 'next/router'

import { createResourceManager } from '@services/resources/reducer'
import {
  displaySuccessMessage,
  displayErrorMessage
} from '@services/messages/reducer'
import * as api from '@services/api'

const SubscriptionsResourceManager = createResourceManager({
  actions: {
    loadResources: {
      action: api.getSubscriptions,
      abortable: true
    },
    deleteResource: {
      action: api.deleteSubscription,
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

export default {
  SubscriptionsProvider: SubscriptionsResourceManager.Provider,
  useSubscriptionsReducer: SubscriptionsResourceManager.useReducer,
  INITIAL_STATE: SubscriptionsResourceManager.INITIAL_STATE
}
