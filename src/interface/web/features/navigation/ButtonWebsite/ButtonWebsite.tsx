import { redirect } from 'next/navigation'
import { ButtonNeutral } from '@web/components/Buttons'
import Icon from '@web/components/Icons'

import * as cls from './styles.css'

const ButtonWebsite = () => {
  const websiteAction = async () => {
    'use server'
    redirect('/')
  }

  return (
    <form action={websiteAction}>
      <ButtonNeutral block type="submit">
        <Icon name="website" size="lg" />
        <span className={cls.text}>View website</span>
      </ButtonNeutral>
    </form>
  )
}

export default ButtonWebsite
