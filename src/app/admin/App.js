import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from '@reach/router'

import Page from './components/Page'
import { AdminTabs } from './components/tabs'

const App = ({ children, ...props }) => {
  if (!props.user || !props.user.cid) {
    return <Redirect to="/admin/login" />
  }

  return (
    <Page>
      <AdminTabs />
      {children}
    </Page>
  )
}

App.propTypes = {
  children: PropTypes.node,
  user: PropTypes.shape({
    cid: PropTypes.string.isRequired
  })
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(App)
