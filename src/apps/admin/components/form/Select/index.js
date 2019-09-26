import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { IconAngleRight } from '@common/components/Icons'
import { GroupInline } from '../components/Group'
import Label from '../components/Label'

const SelectWrapper = styled.div`
  position: relative;

  svg {
    position: absolute;
    top: 50%;
    right: 0.9rem;
    bottom: 0;
    transform: translate(0, -50%) rotate(90deg);
    pointer-events: none;
  }
`

const StyledSelect = styled.select`
  appearance: none;
  background: var(--white);
  border: 1px solid var(--gray-1);
  border-radius: 0.5rem;
  box-shadow: 1px 1px 3px var(--box-shadow);
  cursor: pointer;
  font-family: 'Roboto', Arial, sans-serif;
  font-size: 1.4rem;
  outline: none;
  padding: 0.8rem 2.6rem 0.8rem 0.8rem;

  &:focus {
    border-color: var(--gray-2);
  }
`

const Select = (props = {}) => {
  return (
    <GroupInline>
      <Label htmlFor={props.name}>{props.label}</Label>
      <SelectWrapper>
        <StyledSelect
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
        </StyledSelect>
        <IconAngleRight />
      </SelectWrapper>
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
