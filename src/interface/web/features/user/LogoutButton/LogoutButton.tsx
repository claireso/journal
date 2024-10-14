'use client'

import React from 'react'
import { signOut } from 'next-auth/react'

import { ButtonNeutral } from '@web/components/Buttons'

const LogoutButton = () => {
  return (
    <ButtonNeutral block outline onClick={() => signOut()}>
      Sign out
    </ButtonNeutral>
  )
}

export default LogoutButton
