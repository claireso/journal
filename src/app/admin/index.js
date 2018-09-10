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

  :root {
    --text: #333;
    --primary: #8e44ad;
    --primary-darken: #9b59b6;
    --secondary: #ecf0f1;
    --secondary-darken: #dcdede;
    --hightlight: #ffe65d;
    --error: #f00;
    --white: #fff;
    --gray-1: #d4d3d3;
    --gray-2: #999;
    --gray-3: #464646;
    --gutter: 2rem;
    --container-max-width: 96rem;
  }

  body {
    color: var(--text);
    font-family: "Roboto", Arial, sans-serif;
    font-size: 16px;
    margin: 0;
  }

  main {
    max-width: var(--container-max-width);
    padding: calc(var(--gutter)*2) var(--gutter);
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
