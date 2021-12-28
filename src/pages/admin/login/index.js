import styled from 'styled-components'

import Layout from '@features/admin/Layout'

import { Heading1 } from '@components/Headings'
import Box from '@components/Box'

import LoginForm from '@features/user/LoginForm'

import useUser from '@features/user/useUser'

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  height: 100vh;
  > main {
    width: 100%;
    padding-top: 0;
    padding-bottom: 0;
  }
`

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
