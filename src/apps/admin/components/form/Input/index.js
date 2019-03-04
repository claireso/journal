import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Group } from '../components/Group'
import Label from '../components/Label'

const StyledInput = styled.input`
  border: 1px solid var(--gray-1);
  border-radius: 0.4rem;
  display: block;
  outline: none;
  padding: 1rem;
  width: 100%;
  font-size: 1.4rem;

  &:focus {
    box-shadow: 0 0 0 0.3rem #c8e2ff;
  }
`

class Input extends React.PureComponent {
  handleChange = event => {
    const { onChange } = this.props

    onChange(this.props.name, event.target.value)
  }

  render() {
    return (
      <Group>
        <Label htmlFor={this.props.name}>{this.props.label}</Label>
        <StyledInput
          id={this.props.name}
          type={this.props.type || 'text'}
          name={this.props.name}
          defaultValue={this.props.value}
          required={this.props.required}
          onChange={this.props.onChange && this.handleChange}
          autoFocus={this.props.autoFocus}
        />
      </Group>
    )
  }
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
