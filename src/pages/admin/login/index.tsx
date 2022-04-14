import { styled } from '@theme'

import Layout from '@features/admin/Layout'

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

  return (
    <Wrapper>
      <main>
        <Box>
          <Heading1>Login</Heading1>
          <LoginForm onSubmit={login} isProcessing={isProcessing} />
        </Box>
      </main>
    </Wrapper>
  )
}

Login.Layout = Layout

export default Login
