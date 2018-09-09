import React from 'react'
import { Router, Redirect } from '@reach/router'
import { createGlobalStyle } from 'styled-components'

import App from './App'
import Login from './login/containers/Login'
import Photos from './photos/containers/List'
import CreatePhoto from './photos/containers/Create'
import EditPhoto from './photos/containers/Edit'
import DeletePhoto from './photos/containers/Delete'
import Subscriptions from './subscriptions/containers/List'
import DeleteSubscription from './subscriptions/containers/Delete'

import ScrollUp from './components/ScrollUp'

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size: 62.5%;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    color: #333;
    font-family: "Roboto", Arial, sans-serif;
    font-size: 16px;
    margin: 0;
  }

  main {
    max-width: 96rem;
    padding: 4rem 2rem;
    margin: 0 auto;
  }

  svg {
    fill: currentColor;
  }
`

const NotFound = () => <p>Sorry, nothing here</p>

const Admin = () => {
  return (
    <React.Fragment>
      <GlobalStyle />
      <Router basepath="/admin">
        <ScrollUp default>
          <App path="/">
            <Redirect from="/" to="photos" />
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
