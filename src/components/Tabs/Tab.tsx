import React from 'react'
import * as S from './Tabs.styles'

interface TabProps {
  isActive?: boolean
  children: React.ReactNode
}

const Tab = ({ isActive = false, children }: TabProps) => {
  return <S.TabWrapper isActive={isActive}>{children}</S.TabWrapper>
}

export default Tab
