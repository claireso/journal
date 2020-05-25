import React from 'react'
import PropTypes from 'prop-types'

import { StyledButtonIcon } from './Buttons.styles'

const ButtonIcon = ({ children, ...props }) => {
  return <StyledButtonIcon {...props}>{children}</StyledButtonIcon>
}

ButtonIcon.propTypes = {
  children: PropTypes.element.isRequired
}

export default ButtonIcon
