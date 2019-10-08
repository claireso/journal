import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Group } from '../components/Group'
import Label from '../components/Label'

const StyledInput = styled.input`
  appearance: none;
  border: 1px solid var(--gray-1);
  border-radius: 0.4rem;
  box-shadow: 1px 1px 3px var(--box-shadow);
  display: block;
  outline: none;
  padding: 0.8rem 1.2rem;
  width: 100%;
  font-size: 1.4rem;
  line-height: 1.71;
  transition: border-color 250ms ease-out;

  &:focus {
    border-color: var(--gray-2);
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
