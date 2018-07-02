import React from 'react'
import { Router, Link, Redirect } from '@reach/router'

import App from './App'
import Photos from './photos/containers'
import CreatePhoto from './photos/views/Create'
import Subscriptions from './subscriptions/List'

const NotFound = () => <p>Sorry, nothing here</p>

export default (props) => {
  return (
    <Router basepath="/admin">
      <App path="/">
        <Redirect from="/" to="photos" />
        <NotFound default />
        <Photos path="photos">
          <CreatePhoto path="new" />
        </Photos>
        <Subscriptions path="subscriptions" />
      </App>
    </Router>
  )
}