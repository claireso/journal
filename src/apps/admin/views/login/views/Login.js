import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Heading1 } from '@admin/components/Headings'
import Box from '@admin/components/Box'

import Form from './form/Form'

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  height: 100vh;

  > main {
    width: 100%;
    padding-top: 0;
    padding-bottom: 0;
  }
`

const Login = props => {
  return (
    <Wrapper>
      <main>
        <Box>
          <Heading1>Login</Heading1>
          <Form onSubmit={props.login} isProcessing={props.isLogin} />
        </Box>
      </main>
    </Wrapper>
  )
}

Login.defaultProps = {
  isLogin: false
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isLogin: PropTypes.bool.isRequired
}

export default Login
