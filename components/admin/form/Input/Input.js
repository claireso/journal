import { useCallback } from 'react'
import PropTypes from 'prop-types'

import { Group } from '../Group'
import Label from '../Label'

import * as S from './Input.styles'

const Input = ({ onChange, name, ...props }) => {
  const handleChange = useCallback(
    (event) => {
      onChange(name, event.target.value)
    },
    [onChange, name]
  )

  return (
    <Group>
      <Label htmlFor={name}>{props.label}</Label>
      <S.StyledInput
        id={name}
        type={props.type || 'text'}
        name={name}
        defaultValue={props.value}
        required={props.required}
        onChange={onChange && handleChange}
        autoFocus={props.autoFocus}
      />
    </Group>
  )
}

Input.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  type: PropTypes.string,
  required: PropTypes.bool,
  onChange: PropTypes.func,
  autoFocus: PropTypes.bool
}

export default Input
