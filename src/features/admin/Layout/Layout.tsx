import Head from 'next/head'
import React, { useEffect, useCallback, useMemo } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import PropTypes from 'prop-types'

import * as S from './Layout.styles'

import { IconAngleRight } from '@components/Icons'
import Toolbar from '@components/Toolbar'
import { Tabs, Tab } from '@components/Tabs'

import Messages from '@features/messages/Messages'
import useUser, { UserProvider } from '@features/user/useUser'
import { MessagesProvider } from '@features/messages/useMessages'

interface LayoutProps {
  children?: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
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
    <>{children}</>
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

// const withDocument = (Component: any) => {
function withDocument(Component: React.ComponentType) {
  const Document = (props: {}) => {
    S.globalStyles()
    return (
      <>
        <Head>
          <title>Admin - {process.env.NEXT_PUBLIC_WEBSITE_META_TITLE}</title>
          <meta name="robots" content="noindex, nofollow" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>

        <UserProvider>
          <MessagesProvider>
            <Component {...props} />
          </MessagesProvider>
        </UserProvider>
      </>
    )
  }

  return Document
}

export default withDocument(Layout)
