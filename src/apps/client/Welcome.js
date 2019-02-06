import React from 'react'
import styled from 'styled-components'

import { Heading1 } from './components/Headings'
import { PrimaryLink } from './components/Links'

const Wrapper = styled.div`
  padding: 6rem 0;

  > p {
    font-size: 1.8rem;
  }
`

const Welcome = () => {
  return (
    <Wrapper>
      <Heading1>Welcome to your Journal 🎉</Heading1>
      <p>
        Go to your <PrimaryLink href="/admin">admin</PrimaryLink> to publish
        your first photo
      </p>
    </Wrapper>
  )
}

export default Welcome
