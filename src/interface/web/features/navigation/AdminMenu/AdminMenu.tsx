'use client'

import React from 'react'

import MenuLink from './MenuLink'

import * as cls from './styles.css'

interface AdminMenuProps {}

const AdminMenu = (props: AdminMenuProps) => {
  return (
    <ul className={cls.list}>
      <li>
        <MenuLink slug="photos" icon="photo">
          Photos
        </MenuLink>
      </li>
      <li>
        <MenuLink slug="subscriptions" icon="alert">
          Subscriptions
        </MenuLink>
      </li>
    </ul>
  )
}

export default AdminMenu
