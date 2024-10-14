import React from 'react'

import Icon from '@web/components/Icons'

import Group from '../Group'
import Label from '../Label'

import * as cls from './styles.css'

interface Option {
  label: string
  value: string
}

interface SelectProps {
  name: string
  label: string
  options: Option[]
  value?: string
}

const Select = ({ name, label, value, options }: SelectProps) => {
  return (
    <Group inline>
      <Label htmlFor={name}>{label}</Label>
      <div className={cls.wrapper}>
        <select className={cls.select} id={name} name={name} defaultValue={value} required>
          {options.map((option, index) => {
            return (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            )
          })}
        </select>
        <div className={cls.icon}>
          <Icon name="arrow-down" size="sm" />
        </div>
      </div>
    </Group>
  )
}

export default Select
