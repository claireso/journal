import { useRef } from 'react'
import PropTypes from 'prop-types'

import Input from '@components/form/Input'
import SubmitButton from '@components/form/Buttons'

const LoginForm = ({ onSubmit, isProcessing }) => {
  const username = useRef(null)
  const password = useRef(null)

  const handleSubmit = (event) => {
    event.preventDefault()

    if (isProcessing) return

    onSubmit({
      username: username.current.value,
      password: password.current.value
    })
  }

  return (
    <form onSubmit={handleSubmit} method="POST">
      <Input ref={username} autoFocus name="username" label="Username" testId="username" required />
      <Input ref={password} type="password" name="password" label="Password" testId="password" required />
      <SubmitButton value="Log in" isLoading={isProcessing} data-testid="submit" />
    </form>
  )
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
  isProcessing: PropTypes.bool
}

LoginForm.defaultProps = {
  onSubmit: () => {},
  isProcessing: false
}

export default LoginForm
