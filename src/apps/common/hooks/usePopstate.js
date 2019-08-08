import { useEffect } from 'react'

export default fn => {
  useEffect(() => {
    // listen history
    window.addEventListener('popstate', fn)

    return () => {
      window.removeEventListener('popstate', fn)
    }
  }, [fn])
}
