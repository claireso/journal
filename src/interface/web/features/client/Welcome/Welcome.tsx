'use client'

import Link from 'next/link'

import { Heading1 } from '@web/components/Headings'
import { LinkPrimary } from '@web/components/Links'

import * as S from './Welcome.styles'

const Welcome = () => {
  return (
    <S.Wrapper>
      <Heading1 data-testid="welcome-title">Welcome to your Journal 🎉</Heading1>
      <p>
        Go to your{' '}
        <Link href="/admin" passHref>
          <LinkPrimary data-testid="welcome-link-admin">admin</LinkPrimary>
        </Link>{' '}
        to publish your first photo
      </p>
    </S.Wrapper>
  )
}

export default Welcome
