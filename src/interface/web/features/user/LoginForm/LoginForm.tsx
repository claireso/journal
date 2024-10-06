import { useRef } from 'react'

import Input from '@web/components/form/Input'
import SubmitButton from '@web/components/form/Buttons'

interface LoginFormProps {
  onSubmit: (data: { username: string; password: string }) => void
  isProcessing?: boolean
}

const LoginForm = ({ onSubmit, isProcessing = false }: LoginFormProps) => {
  const username = useRef<HTMLInputElement>(null!)
  const password = useRef<HTMLInputElement>(null!)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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

export default LoginForm
