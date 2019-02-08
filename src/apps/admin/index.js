import React from 'react'
import { Router, Redirect } from '@reach/router'
import Loadable from 'react-loadable'

import Styles from './Styles'

import Loader from '@common/components/Loader'

import App from './App'
import ScrollUp from './components/ScrollUp'

const NotFound = () => <p>Sorry, nothing here</p>

const AsyncPhotos = Loadable({
  loader: () => import('./views/photos/containers/List'),
  loading: Loader
})

const AsyncSubscriptions = Loadable({
  loader: () => import('./views/subscriptions/containers/List'),
  loading: Loader
})

const AsyncLogin = Loadable({
  loader: () => import('./views/login/containers/Login'),
  loading: Loader
})

const Admin = () => {
  return (
    <React.Fragment>
      <Styles />
      <Router basepath="/admin">
        <ScrollUp default>
          <App path="/">
            <Redirect from="/" to="/admin/photos" />
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
