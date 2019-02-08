import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Input from '@admin/components/form/Input'
import SubmitButton from '@admin/components/form/components/Button'

const Form = props => {
  const [state, setState] = useState({ username: '', password: '' })

  function handleChange(fieldName, value) {
    setState(prevState => ({ ...prevState, [fieldName]: value }))
  }

  function handleSubmit(event) {
    event && event.preventDefault()

    const { onSubmit, isProcessing } = props

    if (isProcessing) return

    onSubmit && onSubmit(state)
  }

  return (
    <form onSubmit={handleSubmit} method="POST">
      <Input
        autoFocus
        name="username"
        label="Username"
        required
        onChange={handleChange}
        value={state.username}
      />
      <Input
        type="password"
        name="password"
        label="Password"
        required
        onChange={handleChange}
        value={state.password}
      />
      <SubmitButton value="Log in" isLoading={props.isProcessing} />
    </form>
  )
}

Form.propTypes = {
  onSubmit: PropTypes.func,
  isProcessing: PropTypes.bool.isRequired
}

export default Form
