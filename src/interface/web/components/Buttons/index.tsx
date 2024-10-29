import React from 'react'
import Button, { ButtonProps } from './Button'

export { default as Button } from './Button'

export const ButtonPrimary = ({ children, ...props }: Omit<ButtonProps, 'variant'>) => {
  return (
    <Button variant="primary" {...props}>
      {children}
    </Button>
  )
}

export const ButtonNeutral = ({ children, ...props }: Omit<ButtonProps, 'variant'>) => {
  return (
    <Button variant="neutral" {...props}>
      {children}
    </Button>
  )
}

export const ButtonDanger = ({ children, ...props }: Omit<ButtonProps, 'variant'>) => {
  return (
    <Button variant="danger" {...props}>
      {children}
    </Button>
  )
}

export const ButtonDark = ({ children, ...props }: Omit<ButtonProps, 'variant'>) => {
  return (
    <Button variant="dark" {...props}>
      {children}
    </Button>
  )
}
