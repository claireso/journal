import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Redirect } from '@reach/router'

import Page from './components/Page'
import FlashGroup from './components/FlashGroup'
import { AdminTabs } from './components/tabs'
import Link from './components/Links'
import { IconAngleRight } from './components/Icons'

import { closeMessage } from '@common/actions/messages'

const Nav = styled.div`
  align-items: center;
  border-bottom: 1px solid var(--secondary);
  display: flex;
  justify-content: space-between;
`

const App = ({ children, messages, ...props }) => {
  if (!props.user || !props.user.cid) {
    const next = encodeURIComponent(props.location.pathname)
    return <Redirect to={`/admin/login?next=${next}`} />
  }

  return (
    <Page>
      <FlashGroup messages={messages} onClose={props.closeMessage} />
      <Nav>
        <AdminTabs />
        <Link href="/">
          View website
          <IconAngleRight />
        </Link>
      </Nav>
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
