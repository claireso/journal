import React from 'react'
import Link from 'next/link'

import { Heading1 } from '@components/client/Headings'
import { PrimaryLink } from '@components/client/Links'

import * as S from './Welcome.styles'

const Welcome = () => {
  return (
    <S.Wrapper>
      <Heading1>Welcome to your Journal 🎉</Heading1>
      <p>
        Go to your{' '}
        <Link href="/admin" passHref>
          <PrimaryLink>admin</PrimaryLink>
        </Link>{' '}
        to publish your first photo
      </p>
    </S.Wrapper>
  )
}

export default Welcome
