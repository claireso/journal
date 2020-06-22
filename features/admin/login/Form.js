import { useState, useCallback } from 'react'
import PropTypes from 'prop-types'

import Input from '@components/form/Input'
import SubmitButton from '@components/form/Buttons'

const FormLogin = (props) => {
  const [state, setState] = useState({ username: '', password: '' })
  const { onSubmit, isProcessing } = props

  const handleChange = useCallback((fieldName, value) => {
    setState((prevState) => ({ ...prevState, [fieldName]: value }))
  }, [])

  const handleSubmit = useCallback(
    (event) => {
      event && event.preventDefault()

      if (isProcessing) return

      onSubmit && onSubmit(state)
    },
    [state, onSubmit, isProcessing]
  )

  return (
    <form onSubmit={handleSubmit} method="POST">
      <Input
        autoFocus
        name="username"
        label="Username"
        testId="username"
        required
        onChange={handleChange}
        value={state.username}
      />
      <Input
        type="password"
        name="password"
        label="Password"
        testId="password"
        required
        onChange={handleChange}
        value={state.password}
      />
      <SubmitButton
        value="Log in"
        isLoading={props.isProcessing}
        data-testid="submit"
      />
    </form>
  )
}

FormLogin.propTypes = {
  onSubmit: PropTypes.func,
  isProcessing: PropTypes.bool.isRequired
}

export default FormLogin
