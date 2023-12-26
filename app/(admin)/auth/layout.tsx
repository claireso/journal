'use client'

import { styled } from '@theme'
import Box from '@components/Box'

const Wrapper = styled('div', {
  alignItems: 'center',
  display: 'flex',
  height: '100vh',
  background: '$secondary200',
  '> main': {
    width: '100%',
    pt: 0,
    pb: 0
  }
})

interface LayoutAuthProps {
  children: React.ReactNode
}

const LayoutAuth = ({ children }: LayoutAuthProps) => {
  return (
    <Wrapper>
      <main>
        <Box>{children}</Box>
      </main>
    </Wrapper>
  )
}

export default LayoutAuth
