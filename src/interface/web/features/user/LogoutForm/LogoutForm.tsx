import React from 'react'

import { ButtonNeutral } from '@web/components/Buttons'
import Icon from '@web/components/Icons'

import * as cls from './styles.css'

interface LogoutFormProps {
  action: () => Promise<void>
}

const LogoutForm = ({ action }: LogoutFormProps) => {
  return (
    <form action={action}>
      <ButtonNeutral block outline>
        <Icon name="exit" className={cls.icon} size="lg" />
        <span className={cls.text}>Sign out</span>
      </ButtonNeutral>
    </form>
  )
}

export default LogoutForm
