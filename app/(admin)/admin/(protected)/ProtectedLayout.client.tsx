'use client'
import { useEffect } from 'react'
import useUser from '@features/user/useUser'
import { useRouter } from 'next/navigation'

import { Loader } from '@components/Loader'

interface PageLayoutProps {
  children: React.ReactNode
}

const ProtectedLayout = ({ children }: PageLayoutProps) => {
  const [{ user, isLoading }, { getMe, reset }] = useUser()
  const router = useRouter()

  useEffect(() => {
    getMe()
  }, [])

  if (isLoading) {
    return <Loader />
  }

  if (!user) {
    reset() // set default state before routing to page login
    router.replace('/admin/login')
    return null
  }

  return <>{children}</>
}

export default ProtectedLayout
