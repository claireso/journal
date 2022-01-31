import React from 'react'
import PropTypes from 'prop-types'

import { ButtonLoading, ButtonSubmit } from './Buttons.styles'
import { Loader } from '@components/Loader'

const Button = (props) =>
  props.isLoading ? (
    <ButtonLoading>
      <Loader />
    </ButtonLoading>
  ) : (
    <ButtonSubmit data-testid={props['data-testid']} value={props.value} type="submit" />
  )

Button.propTypes = {
  isLoading: PropTypes.bool,
  value: PropTypes.string.isRequired,
  'data-testid': PropTypes.string
}

Button.defaultProps = {
  isLoading: false,
  'data-testid': ''
}

export default Button
