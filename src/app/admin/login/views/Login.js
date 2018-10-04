import React from 'react'
import PropTypes from 'prop-types'

import { Heading1 } from '@admin/components/Headings'
import Box from '@admin/components/Box'

import Form from './form/Form'

const Login = props => {
  return (
    <main>
      <Box>
        <Heading1>Login</Heading1>
        <Form onSubmit={props.login} isProcessing={props.isLogin} />
      </Box>
    </main>
  )
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isLogin: PropTypes.bool.isRequired
}

export default Login
