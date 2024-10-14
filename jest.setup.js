import '@testing-library/jest-dom/jest-globals'
import '@vanilla-extract/css/disableRuntimeStyles'

window.scroll = () => {}
window.scrollTo = () => {}
window.alert = () => {}

global.IntersectionObserver = class IntersectionObserver {
  constructor() {}

  observe() {
    return null
  }

  unobserve() {
    return null
  }

  disconnect() {
    return null
  }
}

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
global.setServiceWorker = ({ register, subscribe, ready, getSubscription } = {}) => {
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

jest.mock('@web/services/api', () => {
  // https://github.com/swc-project/swc/issues/3843#issuecomment-1058826971
  const actualModule = jest.requireActual('./src/interface/web/services/api')

  return {
    __esModule: true,
    ...actualModule
  }
})

jest.mock('@web/services/notifications', () => {
  // https://github.com/swc-project/swc/issues/3843#issuecomment-1058826971
  const actualModule = jest.requireActual('./src/interface/web/services/notifications')

  return {
    __esModule: true,
    ...actualModule
  }
})
