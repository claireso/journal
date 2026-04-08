import Link from 'next/link'

import { Heading1 } from '@web/components/Headings'
import * as clsLink from '@web/components/Links/styles.css'
import Text from '@web/components/Text'

import * as cls from './styles.css'

const Welcome = () => {
  return (
    <div className={cls.wrapper}>
      <Heading1 data-testid="welcome-title">Welcome to your Journal 🎉</Heading1>
      <Text size="lg">
        Go to your{' '}
        <Link href="/admin" className={clsLink.link({ variant: 'primary' })}>
          admin
        </Link>{' '}
        to publish your first photo
      </Text>
    </div>
  )
}

export default Welcome
