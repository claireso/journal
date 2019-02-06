import React from 'react'
import ReactDOM from 'react-dom'
import Loadable from 'react-loadable'
import { Provider } from 'react-redux'

import configureStore from '@admin/store/configureStore'

import Admin from '@admin'

const store = configureStore(window.preloadedState)
const dom = document.querySelector('#js-app')

if (dom) {
  Loadable.preloadReady().then(() => {
    ReactDOM.hydrate(
      <Provider store={store}>
        <Admin />
      </Provider>,
      dom
    )
  })
}
