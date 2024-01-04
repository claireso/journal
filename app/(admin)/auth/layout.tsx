'use client'

import { Suspense } from 'react'

import Box from '@components/Box'
import { Loader } from '@components/Loader'

import * as S from './Layout.styles'

interface AuthLayoutProps {
  children: React.ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <S.Wrapper>
      <main>
        <Box>
          <Suspense fallback={<Loader />}>{children}</Suspense>
        </Box>
      </main>
    </S.Wrapper>
  )
}

export default AuthLayout
