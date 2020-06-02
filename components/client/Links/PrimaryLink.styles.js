import styled from 'styled-components'

import Link from './Link.styles'

export default styled(Link)`
  color: var(--primary);
  &:hover,
  &:focus {
    border-bottom: 1px solid var(--primary);
  }
`
