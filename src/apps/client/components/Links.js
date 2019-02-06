import styled from 'styled-components'

export const Link = styled.a`
  text-decoration: none;
`

export const PrimaryLink = styled(Link)`
  color: var(--primary);

  &:hover,
  &:focus {
    border-bottom: 1px solid var(--primary);
  }
`
