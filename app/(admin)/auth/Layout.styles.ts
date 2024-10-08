import { styled } from '@web/oldtheme'

export const Wrapper = styled('div', {
  alignItems: 'center',
  display: 'flex',
  height: '100vh',
  background: '$secondary200',
  '> main': {
    width: '100%',
    pt: 0,
    pb: 0
  }
})
