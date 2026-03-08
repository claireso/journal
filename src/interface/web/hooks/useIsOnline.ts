import { useState, useEffect } from 'react'

const useIsOnline = () => {
  const [isOnline, setIsOnline] = useState(() => (typeof navigator !== 'undefined' ? navigator.onLine : true))

  const handleOnlineStatus = () => setIsOnline(true)
  const handleOfflineStatus = () => setIsOnline(false)

  useEffect(() => {
    window.addEventListener('offline', handleOfflineStatus)
    window.addEventListener('online', handleOnlineStatus)

    return () => {
      window.removeEventListener('offline', handleOfflineStatus)
      window.removeEventListener('online', handleOnlineStatus)
    }
  }, [])

  return isOnline
}

export default useIsOnline
