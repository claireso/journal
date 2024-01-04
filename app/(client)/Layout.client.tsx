'use client'

import * as S from './Layout.styles'

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return <S.Main>{children}</S.Main>
}

export default Layout
