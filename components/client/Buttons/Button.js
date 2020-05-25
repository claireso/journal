import React from 'react'
import PropTypes from 'prop-types'

import { StyledButton } from './Buttons.styles'

const Button = ({ children, ...props }) => {
  return <StyledButton {...props}>{children}</StyledButton>
}

Button.propTypes = {
  children: PropTypes.string.isRequired
}

export default Button
