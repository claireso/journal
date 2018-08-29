import React from 'react'
import PropTypes from 'prop-types'

import { GroupInline } from './components/Group'
import Label from './components/Label'

const Checkbox = (props = {}) => {
  return (
    <GroupInline>
      <Label htmlFor={props.name}>{props.label}</Label>
      <input
        id={props.name}
        type="checkbox"
        name={props.name}
        defaultChecked={props.value}
      />
    </GroupInline>
  )
}

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.number
  ])
}

export default Checkbox
