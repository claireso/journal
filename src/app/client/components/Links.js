import styled from 'styled-components'

export const Link = styled.a`
  text-decoration: none;
`

export const PrimaryLink = styled(Link)`
  color: #8e44ad;

  &:hover,
  &:focus {
    border-bottom: 1px solid #8e44ad;
  }
`
