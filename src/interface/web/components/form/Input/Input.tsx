'use client'
import React, { useCallback } from 'react'

import Group from '../Group'
import Label from '../Label'

import * as cls from './styles.css'

interface InputProps extends Omit<React.ComponentProps<'input'>, 'onChange'> {
  name: string
  label: string
  onChange?: (name: string, value: string) => void
}

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { onChange, name, label, value = '', type = 'text', required = false, autoFocus = false } = props

  const handleChange = useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      onChange && onChange(name, event.currentTarget.value)
    },
    [onChange, name]
  )

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
        onChange={handleChange}
        autoFocus={autoFocus}
      />
    </Group>
  )
})

Input.displayName = 'Input'

export default Input
