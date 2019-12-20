import { useEffect } from 'react'

export default ({ onPopstate } = {}) => {
  useEffect(() => {
    onPopstate && window.addEventListener('popstate', onPopstate)

    return () => {
      onPopstate && window.removeEventListener('popstate', onPopstate)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const pushState = (state, title, url) => {
    window.history.pushState(state, title, url)

    const popStateEvent = new PopStateEvent('popstate', { state })
    dispatchEvent(popStateEvent)
  }

  return {
    pushState
  }
}
