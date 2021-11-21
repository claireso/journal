import React, { useCallback } from 'react'
import PropTypes from 'prop-types'

import { Group } from '../Group'
import Label from '../Label'

import * as S from './Input.styles'

const Input = React.forwardRef(({ onChange, name, ...props }, ref) => {
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
        ref={ref}
        id={name}
        data-testid={props.testId}
        type={props.type || 'text'}
        name={name}
        defaultValue={props.value}
        required={props.required}
        onChange={onChange && handleChange}
        autoFocus={props.autoFocus}
      />
    </Group>
  )
})

Input.displayName = 'Input'

Input.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  type: PropTypes.string,
  required: PropTypes.bool,
  onChange: PropTypes.func,
  autoFocus: PropTypes.bool,
  testId: PropTypes.string
}

Input.defaultProps = {
  onChange: () => {}
}

export default Input
