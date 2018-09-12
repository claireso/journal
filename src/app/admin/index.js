import React from 'react'
import { Router, Redirect } from '@reach/router'

import Styles from './Styles'
import App from './App'
import Login from './login/containers/Login'
import Photos from './photos/containers/List'
import CreatePhoto from './photos/containers/Create'
import EditPhoto from './photos/containers/Edit'
import DeletePhoto from './photos/containers/Delete'
import Subscriptions from './subscriptions/containers/List'
import DeleteSubscription from './subscriptions/containers/Delete'

import ScrollUp from './components/ScrollUp'

const NotFound = () => <p>Sorry, nothing here</p>

const Admin = () => {
  return (
    <React.Fragment>
      <Styles />
      <Router basepath="/admin">
        <ScrollUp default>
          <App path="/">
            <Redirect from="/" to="/admin/photos" />
            <NotFound default />
            <Photos path="photos">
              <CreatePhoto path="new" />
              <EditPhoto path=":id/edit" />
              <DeletePhoto path=":id/delete" />
            </Photos>
            <Subscriptions path="subscriptions">
              <DeleteSubscription path=":id/delete" />
            </Subscriptions>
          </App>
          <Login path="login" />
        </ScrollUp>
      </Router>
    </React.Fragment>
  )
}

export default Admin
