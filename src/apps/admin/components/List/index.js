import styled from 'styled-components'

/** @component */
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
      color: var(--gray-2);
      font-size: 2rem;
      font-weight: normal;
      line-height: 1;
    }
  }
`
