import { Fragment } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
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
    <Fragment>
      <S.GlobalStyles />

      <Head>
        <title>Admin - {process.env.NEXT_PUBLIC_WEBSITE_META_TITLE}</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <UserProvider value={USER_INITIAL_STATE}>
        {pathname.endsWith('login') ? (
          children
        ) : (
          <LayoutAuthenticatedUser>{children}</LayoutAuthenticatedUser>
        )}
      </UserProvider>
    </Fragment>
  )
}

AdminLayout.propTypes = {
  children: PropTypes.element
}

export default AdminLayout
