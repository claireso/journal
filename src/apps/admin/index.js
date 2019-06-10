import React from 'react'
import { Router, Redirect } from '@reach/router'
import loadable from '@loadable/component'

import Styles from './Styles'

import Loader from '@common/components/Loader'

import App from './App'
import ScrollUp from './components/ScrollUp'

const NotFound = () => <p>Sorry, nothing here</p>

const AsyncPhotos = loadable(() => import('./views/photos/containers/List'), {
  fallback: <Loader />
})

const AsyncSubscriptions = loadable(
  () => import('./views/subscriptions/containers/List'),
  {
    fallback: <Loader />
  }
)

const AsyncLogin = loadable(() => import('./views/login/containers/Login'), {
  fallback: <Loader />
})

const Admin = () => {
  return (
    <React.Fragment>
      <Styles />
      <Router basepath="/admin">
        <ScrollUp default>
          <App path="/">
            <Redirect from="/" to="/admin/photos" noThrow />
            <NotFound default />
            <AsyncPhotos path="photos" />
            <AsyncSubscriptions path="subscriptions" />
          </App>
          <AsyncLogin path="login" />
        </ScrollUp>
      </Router>
    </React.Fragment>
  )
}

export default Admin
