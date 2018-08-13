import React from 'react'
import ReactDOM from 'react-dom'

import Page from '../../app/client'

const dom = document.querySelector('#js-journal')

if (dom) {
  ReactDOM.hydrate(<Page />, dom)
}
