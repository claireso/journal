'use client'
import { useCallback } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

import { IconAngleRight } from '@components/Icons'
import Toolbar from '@components/Toolbar'
import { Tabs, Tab } from '@components/Tabs'

import useUser from '@features/user/useUser'
import Messages from '@features/messages/Messages'

import * as S from './Layout.client.styles'

interface PageLayoutProps {
  children: React.ReactNode
}

const PageLayout = ({ children }: PageLayoutProps) => {
  const pathname = usePathname()
  const router = useRouter()
  const [, { logout }] = useUser()

  const handleLogout = useCallback(() => {
    logout()
    router.push('/admin/login')
  }, [logout, router])

  return (
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

export default PageLayout
