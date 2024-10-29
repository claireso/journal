import { Suspense } from 'react'
import { SessionProvider } from 'next-auth/react'

import Text from '@web/components/Text'

import AdminMenu from '@web/features/navigation/AdminMenu'
import LogoutButton from '@web/features/user/LogoutButton'
import Messages from '@web/features/messages/Messages'
import ButtonWebsite from '@web/features/navigation/ButtonWebsite'

import * as cls from './styles.css'

interface AdminLayoutProps {
  children: React.ReactNode
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <SessionProvider
      // Re-fetch session every 5 minutes
      refetchInterval={5 * 60}
    >
      <div className={cls.sidebar}>
        <div className={cls.sidebarHeader}>
          <Text size="2xl" as="span" weight="semibold" color="light">
            J<span className={cls.sidebarTitle}>ournal</span>
          </Text>
        </div>
        <div className={cls.sidebarContent}>
          <AdminMenu />
        </div>
        <div className={cls.sidebarFooter}>
          <ButtonWebsite />
          <LogoutButton />
        </div>
      </div>
      <div className={cls.content}>
        <div className={cls.messages}>
          <Messages />
        </div>
        {/* TODO check if regression here! */}
        {/* <Suspense>{children}</Suspense> */}
        {children}
      </div>
    </SessionProvider>
  )
}

export default AdminLayout
