import Box from '@web/components/Box'

import * as cls from './styles.css'

interface AuthLayoutProps {
  children: React.ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <main className={cls.main}>
      <Box className={cls.content}>{children}</Box>
    </main>
  )
}

export default AuthLayout
