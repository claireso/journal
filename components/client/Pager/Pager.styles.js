import styled from 'styled-components'

export const Pager = styled.ul`
  grid-column: 1 / -1;
  margin: 0;
  padding: 0;
  text-align: center;
  > li {
    display: inline-block;
    margin: 0 0.5rem;
  }
  @media (min-width: 800px) {
    margin: 8.5rem 0;
  }
`
