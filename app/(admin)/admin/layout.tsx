import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { logout } from '@application/usecases'
import { auth } from '@infrastructure/auth'

import Text from '@web/components/Text'

import AdminMenu from '@web/features/navigation/AdminMenu'
import LogoutForm from '@web/features/user/LogoutForm'
import Messages from '@web/features/messages/Messages'
import ButtonWebsite from '@web/features/navigation/ButtonWebsite'

import * as cls from './styles.css'

interface AdminLayoutProps {
  children: React.ReactNode
}

const AdminLayout = async ({ children }: AdminLayoutProps) => {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) {
    redirect('/auth/login')
  }

  return (
    <>
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
          <LogoutForm action={logout} />
        </div>
      </div>
      <div className={cls.content}>
        <div className={cls.messages}>
          <Messages />
        </div>
        {children}
      </div>
    </>
  )
}

export default AdminLayout
