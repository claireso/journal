import styled from 'styled-components'

export const ButtonSubscribe = styled.a.attrs(() => ({
  href: '#',
  role: 'button'
}))`
  color: inherit;
  text-decoration: none;
  &:before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  &:hover {
    border-bottom: 1px solid currentColor;
  }
`
