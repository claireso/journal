import React from 'react'

import { GroupInline } from '../Group'
import Label from '../Label'

interface CheckboxProps {
  name: string
  label: string
  value: boolean
}

const Checkbox = ({ name, label, value = false }: CheckboxProps) => {
  return (
    <GroupInline>
      <Label htmlFor={name}>{label}</Label>
      <input id={name} type="checkbox" name={name} defaultChecked={value} />
    </GroupInline>
  )
}

export default Checkbox
