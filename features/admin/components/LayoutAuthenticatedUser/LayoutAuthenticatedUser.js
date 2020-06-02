import { useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import PropTypes from 'prop-types'

import * as S from './LayoutAuthenticatedUser.styles'

import Loader from '@components/Loader'
import { IconAngleRight } from '@components/Icons'
import Toolbar from '@components/admin/Toolbar'
import { Tabs, Tab } from '@components/admin/Tabs'

import Messages from '@services/messages/Messages'
import { useUserReducer } from '@services/user/reducer'

const LayoutAuthenticatedUser = ({ children }) => {
  const [{ user, status }, { getMe, logout }] = useUserReducer()

  const router = useRouter()
  const { pathname } = router

  const handleLogout = useCallback(() => logout(), [logout])

  useEffect(() => {
    if (!user) {
      getMe()
    }
  }, [getMe, user])

  if (['idle', 'pending'].includes(status)) {
    return <Loader />
  }

  if (!user) {
    return null
  }

  return (
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

LayoutAuthenticatedUser.propTypes = {
  children: PropTypes.element
}

export default LayoutAuthenticatedUser
