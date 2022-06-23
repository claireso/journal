import React, { useCallback } from 'react'

import { Group } from '../Group'
import Label from '../Label'

import * as S from './Input.styles'

interface InputProps {
  name: string
  label: string
  testId?: string
  type?: string
  value?: string
  required?: boolean
  autoFocus?: boolean
  onChange?: (name: string, value: string) => void
}

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { onChange, name, label, value = '', type = 'text', required = false, autoFocus = false, testId } = props

  const handleChange = useCallback(
    (event) => {
      onChange && onChange(name, event.target.value)
    },
    [onChange, name]
  )

  return (
    <Group>
      <Label htmlFor={name}>{label}</Label>
      <S.StyledInput
        ref={ref}
        id={name}
        data-testid={testId}
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
