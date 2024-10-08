'use client'

import Box from '@web/components/Box'
import * as S from './Layout.styles'

interface AuthLayoutProps {
  children: React.ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <S.Wrapper>
      <main>
        <Box>{children}</Box>
      </main>
    </S.Wrapper>
  )
}

export default AuthLayout
