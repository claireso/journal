import styled from 'styled-components'

import { SecondaryButton } from '../Buttons'

export const PagerWrapper = styled.ul`
  display: inline-flex;
  justify-content: center;
  list-style-type: none;
  width: 100%;
  padding: 0;
  > li {
    margin: 0 0.4rem;
  }
`

export const PagerButton = styled(SecondaryButton)`
  align-items: center;
  font-size: 1.4rem;
  height: 4.4rem;
  justify-content: center;
  padding: 0;
  width: 4.4rem;
`
