import * as S from './Buttons.styles'
import { Loader } from '../Loader'

interface ButtonPrimaryProps {
  children: React.ReactNode
  isLoading?: boolean
  onClick?: () => void
  title?: string
}

export const ButtonPrimary = ({ isLoading = false, ...props }: ButtonPrimaryProps) => {
  if (isLoading) {
    return (
      <S.ButtonLoading color="primary">
        <Loader />
      </S.ButtonLoading>
    )
  }
  return <S.Button color="primary" {...props} />
}

export const ButtonSecondary = (props: Omit<ButtonPrimaryProps, 'isLoading'>) => (
  <S.Button color="secondary" {...props} />
)
export const ButtonIcon = S.ButtonIcon
export const Button = S.Button
