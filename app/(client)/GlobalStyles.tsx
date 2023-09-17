'use client'

import * as S from './Layout.styles'

interface GlobalStylesProps {
  children: React.ReactNode
}

const GlobalStyles = ({ children }: GlobalStylesProps) => {
  S.globalStyles()

  return <S.Main>{children}</S.Main>
}

export default GlobalStyles
