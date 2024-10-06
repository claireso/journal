'use client'

import { Suspense } from 'react'

import Box from '@web/components/Box'
import { Loader } from '@web/components/Loader'

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
