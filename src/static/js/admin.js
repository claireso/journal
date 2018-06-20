import React from 'react'
import ReactDOM from 'react-dom'

import Admin from '../../app/admin'

const dom = document.querySelector('#js-app')

if (dom) {
  ReactDOM.hydrate(<Admin />, dom)
}