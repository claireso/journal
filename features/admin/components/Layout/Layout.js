import { useRouter } from 'next/router'
import PropTypes from 'prop-types'

import * as S from './Layout.styles'

import LayoutAuthenticatedUser from '../LayoutAuthenticatedUser'

import {
  UserProvider,
  INITIAL_STATE as USER_INITIAL_STATE
} from '@services/user/reducer'

const AdminLayout = ({ children }) => {
  const { pathname } = useRouter()

  // wrap all pages except page "login" with the LayoutAuthenticatedUser
  return (
    <UserProvider value={USER_INITIAL_STATE}>
      <S.GlobalStyles />
      {pathname.endsWith('login') ? (
        children
      ) : (
        <LayoutAuthenticatedUser>{children}</LayoutAuthenticatedUser>
      )}
    </UserProvider>
  )
}

AdminLayout.propTypes = {
  children: PropTypes.element
}

export default AdminLayout
