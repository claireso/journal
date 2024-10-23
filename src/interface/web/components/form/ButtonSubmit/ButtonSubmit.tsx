'use client'

import { useFormStatus } from 'react-dom'
import { ButtonPrimary } from '@web/components/Buttons'
import type { ButtonProps } from '@web/components/Buttons/Button'

type ButtonSubmitProps = Omit<ButtonProps, 'variant' | 'loading'>

const ButtonSubmit = ({ children, ...props }: ButtonSubmitProps) => {
  const { pending } = useFormStatus()

  return (
    <ButtonPrimary {...props} loading={pending} type="submit">
      {children}
    </ButtonPrimary>
  )
}

export default ButtonSubmit
