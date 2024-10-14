import React from 'react'

import Group from '../Group'
import Label from '../Label'

interface CheckboxProps {
  name: string
  label: string
  value?: boolean
}

const Checkbox = ({ name, label, value = false }: CheckboxProps) => {
  return (
    <Group inline>
      <Label htmlFor={name}>{label}</Label>
      <input id={name} type="checkbox" name={name} defaultChecked={value} />
    </Group>
  )
}

export default Checkbox
