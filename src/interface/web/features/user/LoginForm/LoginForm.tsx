'use client'

import { useFormStatus } from 'react-dom'
import Input from '@web/components/form/Input'
import { ButtonPrimary } from '@web/components/Buttons'

interface LoginFormProps {
  action: (payload: FormData) => any
}

const SubmitButton = () => {
  const { pending } = useFormStatus()
  return (
    <>
      <ButtonPrimary size="lg" block loading={pending}>
        Log in
      </ButtonPrimary>
    </>
  )
}

const LoginForm = ({ action }: LoginFormProps) => {
  return (
    <form action={action}>
      <Input autoFocus name="username" label="Username" required />
      <Input type="password" name="password" label="Password" required />
      <SubmitButton />
    </form>
  )
}

export default LoginForm
