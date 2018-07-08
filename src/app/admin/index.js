import React from 'react'
import { Router, Link, Redirect, Match } from '@reach/router'

import App from './App'
import Photos from './photos/containers/List'
import Create from './photos/containers/Create'
import Edit from './photos/containers/Edit'
import Delete from './photos/containers/Delete'

import Subscriptions from './subscriptions/List'

import ScrollUp from './components/ScrollUp'

const NotFound = () => <p>Sorry, nothing here</p>

export default (props) => {
  return (
    <Router basepath="/admin">
      <ScrollUp default>
        <App path="/">
          <Redirect from="/" to="photos" />
          <NotFound default />
          <Photos path="photos">
            <Create path="new" />
            <Edit path=":id/edit" />
            <Delete path=":id/delete" />
          </Photos>
          <Subscriptions path="subscriptions" />
          </App>
      </ScrollUp>
    </Router>
  )
}