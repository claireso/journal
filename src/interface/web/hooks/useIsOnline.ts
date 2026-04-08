import { useSyncExternalStore } from 'react'

function subscribe(callback: () => void) {
  window.addEventListener('online', callback)
  window.addEventListener('offline', callback)
  return () => {
    window.removeEventListener('online', callback)
    window.removeEventListener('offline', callback)
  }
}

const useIsOnline = () => {
  return useSyncExternalStore(
    subscribe,
    () => navigator.onLine,
    () => true
  )
}

export default useIsOnline
