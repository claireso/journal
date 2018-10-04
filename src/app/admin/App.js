import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from '@reach/router'

import Page from './components/Page'
import FlashGroup from './components/FlashGroup'
import { AdminTabs } from './components/tabs'

import { closeMessage } from '@common/actions/messages'

const App = ({ children, messages, ...props }) => {
  if (!props.user || !props.user.cid) {
    const next = encodeURIComponent(props.location.pathname)
    return <Redirect to={`/admin/login?next=${next}`} />
  }

  return (
    <Page>
      <FlashGroup messages={messages} onClose={props.closeMessage} />
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
  messages: PropTypes.array.isRequired,
  closeMessage: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  user: state.user,
  messages: state.messages
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
