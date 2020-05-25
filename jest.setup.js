import '@testing-library/jest-dom/extend-expect'
import 'jest-styled-components'
import 'intersection-observer'
import { enableMocks } from 'jest-fetch-mock'

window.scroll = () => {}
window.scrollTo = () => {}

enableMocks()

// go offline
global.goOffline = () => {
  Object.defineProperty(window.navigator, 'onLine', {
    configurable: true,
    get: function () {
      return false
    }
  })
}

// go online
global.goOnline = () => {
  Object.defineProperty(window.navigator, 'onLine', {
    configurable: true,
    get: function () {
      return true
    }
  })
}

// update notification permission
global.setNotificationPermission = (status = 'default') => {
  Object.defineProperty(global, 'Notification', {
    configurable: true,
    get: function () {
      return {
        permission: status
      }
    }
  })
}

// default notification
global.setNotificationPermission()

// update service worker
global.setServiceWorker = ({
  register,
  subscribe,
  ready,
  getSubscription
} = {}) => {
  if (!register) {
    register = jest.fn()
  }

  if (!subscribe) {
    subscribe = jest.fn().mockImplementation(() => Promise.resolve())
  }

  if (!getSubscription) {
    getSubscription = jest.fn().mockImplementation(() => Promise.resolve({}))
  }

  if (!ready) {
    ready = Promise.resolve({
      pushManager: {
        subscribe: subscribe,
        getSubscription: getSubscription
      }
    })
  }

  Object.defineProperty(global.navigator, 'serviceWorker', {
    configurable: true,
    value: {
      register: register,
      ready: ready
    }
  })

  return {
    register,
    subscribe,
    ready,
    getSubscription
  }
}

// enable serviceWorker
global.setServiceWorker()
