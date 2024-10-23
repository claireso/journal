import Input from '@web/components/form/Input'
import ButtonSubmit from '@web/components/form/ButtonSubmit'

interface LoginFormProps {
  action: (payload: FormData) => void
}

const LoginForm = ({ action }: LoginFormProps) => {
  return (
    <form action={action}>
      <Input autoFocus name="username" label="Username" required />
      <Input type="password" name="password" label="Password" required />
      <ButtonSubmit size="lg" block>
        Log in
      </ButtonSubmit>
    </form>
  )
}

export default LoginForm
