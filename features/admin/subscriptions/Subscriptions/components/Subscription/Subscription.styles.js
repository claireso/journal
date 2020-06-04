import styled from 'styled-components'

export const SubscriptionWrapper = styled.li`
  align-items: center;
  display: flex;
  font-size: 1.4rem;
  list-style: none;
  padding: 1.5rem;
  transition: background 100ms ease-out;
  &:hover {
    background: var(--secondary-lighter);
  }
  & + & {
    border-top: 1px solid var(--secondary-normal);
  }
  dl {
    flex: auto;
    margin: 0;
    padding-right: 4rem;
  }
  dt {
    font-weight: 700;
    margin: 0 0 0.5rem;
  }
  dd {
    margin: 0 0 1rem;
    word-wrap: break-word;
    word-break: break-all;
  }
`

export const SubscriptionTools = styled.p`
  transition: opacity 150ms ease-out;
  button {
    opacity: 0.5;
    transition: opacity 150ms ease-out;
    &:hover {
      opacity: 1;
    }
  }
`
