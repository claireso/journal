import { redirect } from 'next/navigation'
import { ButtonDark } from '@web/components/Buttons'
import Icon from '@web/components/Icons'

import * as cls from './notfound-styles.css'

export default function NotFound() {
  const redirectAction = async () => {
    'use server'
    redirect('/')
  }

  return (
    <div className={cls.wrapper}>
      <div className={cls.title}>▸ 404 ◂</div>
      <form action={redirectAction}>
        <ButtonDark type="submit" className={cls.back} outline>
          <Icon name="arrow-left" size="sm" />
          Back
        </ButtonDark>
      </form>
    </div>
  )
}
