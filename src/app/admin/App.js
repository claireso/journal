import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from '@reach/router'

import Page from './components/Page'
import FlashGroup from './components/FlashGroup'
import { AdminTabs } from './components/tabs'

import { closeMessage } from '../../common/actions/api'

const App = ({ children, api, ...props }) => {
  if (!props.user || !props.user.cid) {
    const next = encodeURIComponent(props.location.pathname)
    return <Redirect to={`/admin/login?next=${next}`} />
  }

  return (
    <Page>
      <FlashGroup messages={api.errors} onClose={props.closeMessage} />
      <AdminTabs />
      {children}
    </Page>
  )
}

App.propTypes = {
  children: PropTypes.node,
  location: PropTypes.object.isRequired,
  user: PropTypes.shape({
    cid: PropTypes.string.isRequired
  }),
  api: PropTypes.object.isRequired,
  closeMessage: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  user: state.user,
  api: state.api
})

const mapDispatchToProps = dispatch => ({
  closeMessage(type) {
    dispatch(closeMessage(type))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
