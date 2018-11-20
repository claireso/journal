import React from 'react'
import ReactDOM from 'react-dom'

import Page from '@client'

const dom = document.querySelector('#js-journal')
const preloadedState = window.preloadedState || {}

if (dom) {
  ReactDOM.hydrate(<Page {...preloadedState} />, dom)
}
