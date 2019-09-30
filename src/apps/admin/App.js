import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Redirect, navigate } from '@reach/router'

import { IconAngleRight } from '@common/components/Icons'
import Toolbar from '@admin/components/Toolbar'

import FlashGroup from './components/FlashGroup'
import { AdminTabs } from './components/tabs'
import Link from './components/Links'
import { Button } from './components/Buttons'

import { closeMessage, clearAllMessages } from '@admin/actions/messages'
import { signOut } from '@admin/actions/user'

const Layout = styled.div`
  display: grid;
  grid-template-columns: 15rem auto;
  grid-template-rows: 6rem auto;
  grid-template-areas:
    'title toolbar'
    'sidebar content';
  min-height: 100vh;
`

const Sidebar = styled.div`
  grid-area: sidebar;
`

const Content = styled.div`
  background: var(--white);
  border-left: 1px solid var(--gray-1);
  box-shadow: 0 6px 6px #e0dede;
  grid-area: content;
  padding: 2rem;
`

const Title = styled.h1`
  font-size: 2rem;
  grid-area: title;
  line-height: 6rem;
  margin: 0;
  text-align: center;
`

const LinkGoToWebsite = styled(Link)`
  border-top: 1px solid var(--gray-5);
  display: flex;
  padding: 2rem 2rem 2rem 4rem;
`

const ButtonToSignOut = styled(Button)`
  background: transparent;
  color: var(--white);
  border: 1px solid var(--gray-5);
  display: block;
  line-height: 1;
  max-width: 10rem;
  padding: 1rem;

  &:hover {
    background: var(--gray-5);
    color: var(--text);
  }
`

const ToolbarWrapper = styled.div`
  grid-area: toolbar;
  position: sticky;
  top: 0;
  z-index: 10;
`

const App = ({ children, messages, ...props }) => {
  useEffect(() => {
    if (messages.length) {
      props.clearAllMessages()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.location.pathname])

  // Redirect to the view login if user is not logged
  if (!props.user || !props.user.cid) {
    const next = encodeURIComponent(props.location.pathname)
    return <Redirect to={`/admin/login?next=${next}`} noThrow />
  }

  return (
    <Layout>
      <Title>Journal</Title>
      <Sidebar>
        <AdminTabs />
        <LinkGoToWebsite href="/">
          View website
          <IconAngleRight />
        </LinkGoToWebsite>
      </Sidebar>
      <ToolbarWrapper>
        <Toolbar>
          <ButtonToSignOut onClick={props.signOut}>Sign out</ButtonToSignOut>
        </Toolbar>
      </ToolbarWrapper>
      <Content>
        <FlashGroup messages={messages} onClose={props.closeMessage} />
        {children}
      </Content>
    </Layout>
  )
}

App.propTypes = {
  children: PropTypes.node,
  location: PropTypes.object.isRequired,
  user: PropTypes.shape({
    cid: PropTypes.string
  }),
  messages: PropTypes.array.isRequired,
  closeMessage: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
  clearAllMessages: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  user: state.user,
  messages: state.messages
})

const mapDispatchToProps = dispatch => ({
  closeMessage(type) {
    dispatch(closeMessage(type))
  },
  clearAllMessages() {
    dispatch(clearAllMessages())
  },
  signOut() {
    dispatch(signOut())
      .then(() => {
        navigate('/admin/login')
      })
      .catch(() => {
        throw new Error('can not sign out')
      })
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
