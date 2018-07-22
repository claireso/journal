import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from '@reach/router'

import Page from './components/Page'
import { AdminTabs } from './components/tabs'

const App = ({ children, location, ...props }) => {
  if (!props.user || !props.user.cid) {
    return <Redirect to="/admin/login" />
  }

  return (
    <Page>
      <AdminTabs />
      { children }
    </Page>
  )
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(App)