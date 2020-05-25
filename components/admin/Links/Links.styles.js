import styled from 'styled-components'

export const Link = styled.a`
  align-items: center;
  color: var(--text);
  font-size: 1.2rem;
  display: inline-flex;
  &:hover {
    color: var(--primary);
  }
  > svg {
    margin: 0 0 0 0.4rem;
  }
`
