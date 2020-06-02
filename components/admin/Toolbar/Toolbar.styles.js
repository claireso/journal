import styled from 'styled-components'

export const Toolbar = styled.div`
  background: var(--gray-4);
  color: var(--white);
  display: flex;
  height: var(--toolbar-height);
  justify-content: flex-end;
  padding: 1.2rem 2rem;
  > p {
    align-items: center;
    display: flex;
    margin: 0;
  }
`
