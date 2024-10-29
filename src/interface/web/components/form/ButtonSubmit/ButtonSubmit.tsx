'use client'

import { useFormStatus } from 'react-dom'
import { Button } from '@web/components/Buttons'
import type { ButtonProps } from '@web/components/Buttons/Button'

type ButtonSubmitProps = Omit<ButtonProps, 'loading'>

const ButtonSubmit = ({ children, ...props }: ButtonSubmitProps) => {
  const { pending } = useFormStatus()

  return (
    <Button {...props} loading={pending} type="submit">
      {children}
    </Button>
  )
}

export default ButtonSubmit
