import React from 'react'
import PropTypes from 'prop-types'

import { GroupInline } from '../components/Group'
import Label from '../components/Label'

const Select = (props = {}) => {
  return (
    <GroupInline>
      <Label htmlFor={props.name}>{props.label}</Label>
      <select
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
      </select>
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
