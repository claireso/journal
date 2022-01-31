import PropTypes from 'prop-types'
import * as S from './Buttons.styles'
import { Loader } from '../Loader'

export const ButtonPrimary = ({ isLoading, ...props }) => {
  if (isLoading) {
    return (
      <S.ButtonLoading color="primary">
        <Loader />
      </S.ButtonLoading>
    )
  }
  return <S.Button color="primary" {...props} />
}
ButtonPrimary.propTypes = {
  isLoading: PropTypes.bool
}

export const ButtonSecondary = (props) => <S.Button color="secondary" {...props} />
export const ButtonIcon = S.ButtonIcon
export const Button = S.Button
