'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SessionProvider, signOut } from 'next-auth/react'

import { IconAngleRight } from '@components/Icons'
import Toolbar from '@components/Toolbar'
import { Tabs, Tab } from '@components/Tabs'

import Messages from '@features/messages/Messages'

import * as S from './Layout.client.styles'

interface PageLayoutProps {
  children: React.ReactNode
}

const PageLayout = ({ children }: PageLayoutProps) => {
  const pathname = usePathname()

  const onSignout = () => signOut()

  return (
    <SessionProvider
      // Re-fetch session every 5 minutes
      refetchInterval={5 * 60}
    >
      <S.Layout>
        <S.Title>Journal</S.Title>
        <S.Sidebar>
          <Tabs>
            <Tab isActive={pathname?.includes('photos')}>
              <Link href="/admin/photos" passHref>
                Photos
              </Link>
            </Tab>
            <Tab isActive={pathname?.includes('subscriptions')}>
              <Link href="/admin/subscriptions" passHref>
                Subscriptions
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
            <S.ButtonToSignOut onClick={onSignout}>Sign out</S.ButtonToSignOut>
          </Toolbar>
        </S.ToolbarWrapper>
        <S.Content>
          <Messages />
          {children}
        </S.Content>
      </S.Layout>
    </SessionProvider>
  )
}

export default PageLayout
