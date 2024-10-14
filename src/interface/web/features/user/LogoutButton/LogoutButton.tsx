'use client'

import React from 'react'
import { signOut } from 'next-auth/react'

import { ButtonNeutral } from '@web/components/Buttons'
import Icon from '@web/components/Icons'

import * as cls from './styles.css'

const LogoutButton = () => {
  return (
    <ButtonNeutral block outline onClick={() => signOut()}>
      <Icon name="exit" className={cls.icon} size="lg" />
      <span className={cls.text}>Sign out</span>
    </ButtonNeutral>
  )
}

export default LogoutButton
