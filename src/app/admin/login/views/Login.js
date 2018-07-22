import React from 'react'

import Form from './form/Form'

export default (props) => {
  return (
    <main>
      <div className="box">
        <h1>Login</h1>
        <Form onSubmit={ props.login } />
      </div>
    </main>
  )
}