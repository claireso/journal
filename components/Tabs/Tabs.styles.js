import styled from 'styled-components'

export const Tabs = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`

export const TabWrapper = styled.li`
  a {
    background: ${(props) =>
      props.isActive ? 'var(--tab-active) !important' : 'var(--tab-default)'};
    border-bottom: none;
    border-radius: 0.2rem 0.2rem 0 0;
    color: var(--text-normal);
    display: block;
    font-size: var(--font-size-normal);
    padding: 2rem 2rem 2rem 4rem;
    text-decoration: none;
    transition: background 150ms ease-out;
    &:hover {
      background: var(--tab-hover);
    }
  }
`
