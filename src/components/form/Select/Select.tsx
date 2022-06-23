import React from 'react'

import { IconAngleRight } from '@components/Icons'

import { GroupInline } from '../Group'
import Label from '../Label'

import * as S from './Select.styles'

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
    <GroupInline>
      <Label htmlFor={name}>{label}</Label>
      <S.SelectWrapper>
        <S.StyledSelect id={name} name={name} defaultValue={value} required>
          {options.map((option, index) => {
            return (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            )
          })}
        </S.StyledSelect>
        <IconAngleRight />
      </S.SelectWrapper>
    </GroupInline>
  )
}

export default Select
