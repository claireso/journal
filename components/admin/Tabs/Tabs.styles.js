import styled from 'styled-components'

export const Tabs = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`

export const TabWrapper = styled.li`
  a {
    background: ${(props) =>
      props.isActive ? 'var(--hightlight) !important' : 'var(--secondary)'};
    border-bottom: none;
    border-radius: 0.2rem 0.2rem 0 0;
    color: var(--text);
    display: block;
    font-size: 1.4rem;
    padding: 2rem 2rem 2rem 4rem;
    text-decoration: none;
    transition: background 150ms ease-out;
    &:hover {
      background: var(--gray-5);
    }
  }
`
