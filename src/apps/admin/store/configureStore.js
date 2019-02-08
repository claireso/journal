import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import reducers from '../reducers'
import callApiMiddleware from '../middleware/callApi'

const configureStore = preloadedState => {
  const store = createStore(
    reducers,
    preloadedState,
    composeWithDevTools(applyMiddleware(thunk, callApiMiddleware))
  )

  // if (module.hot) {
  //   // Enable Webpack hot module replacement for reducers
  //   module.hot.accept('../reducers', () => {
  //     store.replaceReducer(rootReducer)
  //   })
  // }

  return store
}

export default configureStore
