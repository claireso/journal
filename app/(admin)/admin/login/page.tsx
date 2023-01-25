'use client'
import { useCallback } from 'react'
import { useRouter } from 'next/navigation'

import { styled } from '@theme'
import * as api from '@services/api'

import { Heading1 } from '@components/Headings'
import Box from '@components/Box'

import LoginForm from '@features/user/LoginForm'
import useUser from '@features/user/useUser'

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

const Login = () => {
  const [{ isProcessing }, { login }] = useUser()
  const router = useRouter()

  const onSubmit = useCallback(
    async (data: { username: string; password: string }) => {
      try {
        await login(data)
        router.replace('/admin/photos')
      } catch (err) {
        if (err instanceof api.getErrorConstructor()) {
          const status = err.response.status

          if ([401, 422].includes(status)) {
            alert('Bad username/password. Please retry')
          }
        }
      }
    },
    [login, router]
  )

  return (
    <Wrapper>
      <main>
        <Box>
          <Heading1>Login</Heading1>
          <LoginForm onSubmit={onSubmit} isProcessing={isProcessing} />
        </Box>
      </main>
    </Wrapper>
  )
}

export default Login
