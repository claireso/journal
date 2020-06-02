import React from 'react'
import PropTypes from 'prop-types'

import { IconAngleRight } from '@components/Icons'

import { GroupInline } from '../Group'
import Label from '../Label'

import * as S from './Select.styles'

const Select = (props = {}) => {
  return (
    <GroupInline>
      <Label htmlFor={props.name}>{props.label}</Label>
      <S.SelectWrapper>
        <S.StyledSelect
          id={props.name}
          name={props.name}
          defaultValue={props.value}
          required
        >
          {props.options.map((option, index) => {
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

Select.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  ).isRequired,
  value: PropTypes.string
}

export default Select
