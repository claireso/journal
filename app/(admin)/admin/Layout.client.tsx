'use client'

import { Suspense } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SessionProvider, signOut } from 'next-auth/react'

import { IconAngleRight } from '@web/components/Icons'
import Toolbar from '@web/components/Toolbar'
import { Tabs, Tab } from '@web/components/Tabs'
import { Loader } from '@web/components/Loader'

import Messages from '@web/features/messages/Messages'

import * as S from './Layout.styles'

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
          <Suspense fallback={<Loader />}>{children}</Suspense>
        </S.Content>
      </S.Layout>
    </SessionProvider>
  )
}

export default PageLayout
