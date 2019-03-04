import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledDefaultButton = styled.button`
  appearance: none;
  background: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  padding: 1rem 1.2rem 1.1rem;
  text-decoration: none;
`

const StyledButton = styled(StyledDefaultButton)`
  background: white;
  border: 1px solid var(--gray-1);
  display: inline-block;
  font-family: 'Roboto', Arial, sans-serif;
  width: 4.2rem;
  color: var(--text);
  font-size: 1.6rem;
  font-weight: 700;
  will-change: border-color;
  transition: border-color 150ms ease-out;

  &:hover {
    border-color: var(--gray-3);
  }
`

const StyledButtonIcon = styled(StyledDefaultButton)``

export const Button = ({ label, ...props }) => {
  return <StyledButton {...props}>{label}</StyledButton>
}

Button.propTypes = {
  label: PropTypes.string.isRequired
}

export const ButtonIcon = ({ children, ...props }) => {
  return <StyledButtonIcon {...props}>{children}</StyledButtonIcon>
}

ButtonIcon.propTypes = {
  children: PropTypes.element.isRequired
}
