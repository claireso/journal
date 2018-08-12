import React from 'react'
import PropTypes from 'prop-types'

import Form from './form/Form'

const Login = props => {
  return (
    <main>
      <div className="box">
        <h1>Login</h1>
        <Form onSubmit={props.login} />
      </div>
    </main>
  )
}

Login.propTypes = {
  login: PropTypes.func.isRequired
}

export default Login
