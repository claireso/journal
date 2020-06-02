import React from 'react'
import PropTypes from 'prop-types'

import { SubmitButtonLoading, SubmitButton } from './Buttons.styles'

const Button = (props) =>
  props.isLoading ? (
    <SubmitButtonLoading as="div" />
  ) : (
    <SubmitButton {...props} />
  )

Button.propTypes = {
  isLoading: PropTypes.bool
}

export default Button
