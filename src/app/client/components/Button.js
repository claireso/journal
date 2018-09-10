import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledButton = styled.button`
  appearance: none;
  background: white;
  border: 1px solid var(--gray-1);
  cursor: pointer;
  display: inline-block;
  font-family: 'Roboto', Arial, sans-serif;
  padding: 1rem 1.2rem 1.1rem;
  width: 4.2rem;
  color: var(--text);
  text-decoration: none;
  font-size: 1.6rem;
  font-weight: 700;
  will-change: border-color;
  transition: border-color 150ms ease-out;
  outline: none;

  &:hover {
    border-color: var(--gray-3);
  }
`

const Button = ({ label, ...props }) => {
  return <StyledButton {...props}>{label}</StyledButton>
}

Button.propTypes = {
  label: PropTypes.string.isRequired
}

export default Button
