import React from 'react'
import Link from 'next/link'

import { useSelectedLayoutSegment } from 'next/navigation'

import * as cls from './styles.css'
import Icon from '@web/components/Icons'

interface MenuLinkProps {
  slug: string
  icon: string
  children: React.ReactNode
}

const MenuLink = ({ slug, children, icon }: MenuLinkProps) => {
  const segment = useSelectedLayoutSegment()
  const active = slug === segment

  return (
    <Link href={slug} className={cls.link({ active })}>
      {icon && <Icon name={icon} />}
      {children}
    </Link>
  )
}

export default MenuLink
