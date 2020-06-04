import styled from 'styled-components'

import withLayoutAdmin from '@features/admin/hoc/withLayoutAdmin'

import { Heading1 } from '@components/Headings'
import Box from '@components/Box'

import FormLogin from '@features/admin/login/Form'

import { useUserReducer } from '@services/user/reducer'

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
  const [{ status }, actions] = useUserReducer()

  const isProcessing = status === 'pending'

  return (
    <Wrapper>
      <main>
        <Box>
          <Heading1>Login</Heading1>
          <FormLogin onSubmit={actions.login} isProcessing={isProcessing} />
        </Box>
      </main>
    </Wrapper>
  )
}

export default withLayoutAdmin(Login)
