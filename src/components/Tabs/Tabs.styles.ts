import { styled } from '@theme'

export const Tabs = styled('ul', {
  listStyle: 'none',
  m: 0,
  p: 0
})

export const TabWrapper = styled('li', {
  a: {
    background: '$secondary200',
    borderBottom: 'none',
    borderRadius: '$1 $1 0 0',
    color: '$grey100',
    display: 'block',
    fontSize: '$4',
    p: '$5 $5 $5 calc($5*2)',
    textDecoration: 'none',
    transition: '$background',
    '&:hover': {
      background: '$white'
    }
  },
  variants: {
    isActive: {
      true: {
        a: {
          background: '$tertiary100 !important'
        }
      }
    }
  }
})
