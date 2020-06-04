import styled from 'styled-components'

export const List = styled.ul`
  margin: 0;
  padding: 0;
`

export const ListHeader = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: 0 0 2rem;

  > h1 {
    line-height: 1.835;
    margin: 0;

    > span {
      color: var(--gray-darker);
      font-size: 2rem;
      font-weight: normal;
      line-height: 1;
    }
  }
`
