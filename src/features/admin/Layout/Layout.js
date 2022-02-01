import Head from 'next/head'
import { useEffect, useCallback, useMemo } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import PropTypes from 'prop-types'

import * as S from './Layout.styles'

import { IconAngleRight } from '@components/Icons'
import Toolbar from '@components/Toolbar'
import { Tabs, Tab } from '@components/Tabs'

import Messages from '@features/messages/Messages'
import useUser, { UserProvider } from '@features/user/useUser'
import { PhotosProvider } from '@features/photos/usePhotos'
import { SubscriptionsProvider } from '@features/subscriptions/useSubscriptions'
import { MessagesProvider } from '@features/messages/useMessages'

const Layout = ({ children }) => {
  const [{ user }, { getMe, logout }] = useUser()

  const router = useRouter()
  const { pathname } = router
  const isLoginPage = useMemo(() => pathname.endsWith('login'), [pathname])

  const handleLogout = useCallback(() => logout(), [logout])

  useEffect(() => {
    if (!user && !isLoginPage) {
      getMe()
    }
  }, [user, isLoginPage, getMe])

  if (!user && !isLoginPage) {
    return null
  }

  return isLoginPage ? (
    children
  ) : (
    <S.Layout>
      <S.Title>Journal</S.Title>
      <S.Sidebar>
        <Tabs>
          <Tab isActive={pathname.includes('photos')}>
            <Link href="photos" passHref>
              <a>Photos</a>
            </Link>
          </Tab>
          <Tab isActive={pathname.includes('subscriptions')}>
            <Link href="subscriptions" passHref>
              <a>Subscriptions</a>
            </Link>
          </Tab>
        </Tabs>
        <Link href="/" passHref>
          <S.LinkGoToWebsite>
            View website
            <IconAngleRight />
          </S.LinkGoToWebsite>
        </Link>
      </S.Sidebar>
      <S.ToolbarWrapper>
        <Toolbar>
          <S.ButtonToSignOut onClick={handleLogout}>Sign out</S.ButtonToSignOut>
        </Toolbar>
      </S.ToolbarWrapper>
      <S.Content>
        <Messages />
        {children}
      </S.Content>
    </S.Layout>
  )
}

Layout.propTypes = {
  children: PropTypes.element
}

const withDocument = (Component) => {
  const Document = (props) => {
    S.globalStyles()
    return (
      <>
        <Head>
          <title>Admin - {process.env.NEXT_PUBLIC_WEBSITE_META_TITLE}</title>
          <meta name="robots" content="noindex, nofollow" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>

        <UserProvider>
          <PhotosProvider>
            <SubscriptionsProvider>
              <MessagesProvider>
                <Component {...props} />
              </MessagesProvider>
            </SubscriptionsProvider>
          </PhotosProvider>
        </UserProvider>
      </>
    )
  }

  return Document
}

export default withDocument(Layout)
