import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import configureStore from '../../common/store/configureStore'

import Admin from '../../app/admin'

const store = configureStore(window.preloadedState)
const dom = document.querySelector('#js-app')

if (dom) {
  ReactDOM.hydrate(
    <Provider store={store}>
      <Admin />
    </Provider>,
    dom
  )
}