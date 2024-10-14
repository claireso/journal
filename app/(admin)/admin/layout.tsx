import { SessionProvider } from 'next-auth/react'

import Text from '@web/components/Text'

import AdminMenu from '@web/features/navigation/AdminMenu'
import LogoutButton from '@web/features/user/LogoutButton'

import * as cls from './styles.css'

// import { useSelectedLayoutSegment } from 'next/navigation'

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
            Journal
          </Text>
        </div>
        <div className={cls.sidebarContent}>
          <AdminMenu />
        </div>
        <div className={cls.sidebarFooter}>
          <LogoutButton />
        </div>
      </div>
      <div className={cls.content}>{children}</div>
    </SessionProvider>
  )
}

export default AdminLayout
