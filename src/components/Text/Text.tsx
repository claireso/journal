import React from 'react'

import * as S from './Text.styles'

interface TextProps {
  align: 'left' | 'center' | 'right'
  children: React.ReactNode
}

const Text = ({ align = 'left', ...props }: TextProps) => <S.Text align={align} {...props} />

export default Text
