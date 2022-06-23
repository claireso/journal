import { styled } from '@theme'

export const Toolbar = styled('div', {
  background: '$gray700',
  color: '$white',
  display: 'flex',
  height: '$toolbarHeight',
  justifyContent: 'flex-end',
  p: '$3 $5',
  '> p': {
    alignItems: 'center',
    display: 'flex',
    m: 0
  }
})
