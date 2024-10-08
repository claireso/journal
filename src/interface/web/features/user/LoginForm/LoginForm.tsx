'use client'

import { useFormStatus } from 'react-dom'
import Input from '@web/components/form/Input'
import SubmitButton from '@web/components/form/Buttons'

interface LoginFormProps {
  action: (payload: FormData) => any
}

const FormSubmitButton = () => {
  const { pending } = useFormStatus()
  return <SubmitButton value="Log in" isLoading={pending} />
}

const LoginForm = ({ action }: LoginFormProps) => {
  return (
    <form action={action}>
      <Input autoFocus name="username" label="Username" testId="username" required />
      <Input type="password" name="password" label="Password" testId="password" required />
      <FormSubmitButton />
    </form>
  )
}

export default LoginForm
