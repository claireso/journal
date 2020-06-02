import PropTypes from 'prop-types'

import {
  StyledPrimaryButtonLoading,
  StyledPrimaryButton
} from './Buttons.styles'

const PrimaryButton = (props) => {
  return props.isLoading ? (
    <StyledPrimaryButtonLoading />
  ) : (
    <StyledPrimaryButton {...props} />
  )
}

PrimaryButton.propTypes = {
  isLoading: PropTypes.bool
}

export default PrimaryButton
