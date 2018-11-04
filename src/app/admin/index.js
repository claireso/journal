import React from 'react'
import { Router, Redirect } from '@reach/router'
import Loadable from 'react-loadable'

import Styles from './Styles'
import Loader from '@common/components/Loader'
import App from './App'
import Login from './login/containers/Login'

import ScrollUp from './components/ScrollUp'

const NotFound = () => <p>Sorry, nothing here</p>

const AsyncPhotos = Loadable({
  loader: () => import("./photos/containers/List"),
  loading: Loader
})

const AsyncSubscriptions = Loadable({
  loader: () => import("./subscriptions/containers/List"),
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
          <Login path="login" />
        </ScrollUp>
      </Router>
    </React.Fragment>
  )
}

export default Admin
