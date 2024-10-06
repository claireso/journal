import { useState, useEffect } from 'react'

const useIsOnline = () => {
  const [isOnline, setIsOnline] = useState(true)

  const handleOnlineStatus = () => setIsOnline(true)
  const handleOfflineStatus = () => setIsOnline(false)

  useEffect(() => {
    setIsOnline(navigator.onLine)

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
