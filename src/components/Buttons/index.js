import PropTypes from 'prop-types'
import * as S from './Buttons.styles'

export const SecondaryButton = S.SecondaryButton
export const ButtonIcon = S.ButtonIcon
export const StyledButton = S.StyledButton

export const PrimaryButton = ({ isLoading, ...props }) => {
  return isLoading ? <S.PrimaryButtonLoading /> : <S.PrimaryButton {...props} />
}

PrimaryButton.propTypes = {
  isLoading: PropTypes.bool
}
