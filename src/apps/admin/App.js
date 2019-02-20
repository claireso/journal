import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Redirect, navigate } from '@reach/router'

import { IconAngleRight } from '@common/components/Icons'

import FlashGroup from './components/FlashGroup'
import { AdminTabs } from './components/tabs'
import Link from './components/Links'
import { Button } from './components/Buttons'

import { closeMessage } from '@admin/actions/messages'
import { signOut } from '@admin/actions/user'

const Layout = styled.div`
  display: grid;
  grid-template-columns: 15rem auto;
  grid-template-rows: 6rem auto;
  grid-template-areas:
    'title content'
    'sidebar content';
  min-height: 100vh;
`

const Sidebar = styled.div`
  grid-area: sidebar;
`

const Content = styled.div`
  background: var(--white);
  grid-area: content;
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
  border: 1px solid var(--gray-3);
  display: block;
  margin: 1.5rem auto;
  max-width: 10rem;

  &:hover {
    background: var(--gray-5);
  }
`

const App = ({ children, messages, ...props }) => {
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
        <ButtonToSignOut onClick={props.signOut}>
          Sign out
        </ButtonToSignOut>
      </Sidebar>
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
  closeMessage: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  user: state.user,
  messages: state.messages
})

const mapDispatchToProps = dispatch => ({
  closeMessage(type) {
    dispatch(closeMessage(type))
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
