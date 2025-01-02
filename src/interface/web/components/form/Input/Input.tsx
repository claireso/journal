import React from 'react'

import Group from '../Group'
import Label from '../Label'

import * as cls from './styles.css'

interface InputProps extends Omit<React.ComponentProps<'input'>, 'onChange'> {
  name: string
  label: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { name, label, value = '', type = 'text', required = false, autoFocus = false } = props

  return (
    <Group>
      <Label htmlFor={name}>{label}</Label>
      <input
        ref={ref}
        className={cls.input}
        id={name}
        type={type}
        name={name}
        defaultValue={value}
        required={required}
        autoFocus={autoFocus}
      />
    </Group>
  )
})

Input.displayName = 'Input'

export default Input
