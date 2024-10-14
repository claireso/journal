import React from 'react'
import Link from 'next/link'

import { useSelectedLayoutSegment } from 'next/navigation'

import * as cls from './styles.css'
import type { IconName } from '@web/components/Icons'
import Icon from '@web/components/Icons'

interface MenuLinkProps {
  slug: string
  icon: IconName
  children: React.ReactNode
}

const MenuLink = ({ slug, children, icon }: MenuLinkProps) => {
  const segment = useSelectedLayoutSegment()
  const active = slug === segment

  return (
    <Link href={slug} className={cls.link({ active })}>
      {icon && <Icon name={icon} size={'lg'} />}
      <span className={cls.text}>{children}</span>
    </Link>
  )
}

export default MenuLink
