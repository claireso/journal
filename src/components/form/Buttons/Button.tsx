import React from 'react'

import { ButtonLoading, ButtonSubmit } from './Buttons.styles'
import { Loader } from '@components/Loader'

interface ButtonProps {
  isLoading?: boolean
  value: string
  'data-testid'?: string
}

const Button = (props: ButtonProps) =>
  props.isLoading ? (
    <ButtonLoading>
      <Loader />
    </ButtonLoading>
  ) : (
    <ButtonSubmit data-testid={props['data-testid']} value={props.value} type="submit" />
  )

Button.defaultProps = {
  isLoading: false,
  'data-testid': ''
}

export default Button
