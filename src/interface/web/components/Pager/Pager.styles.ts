import { styled } from '@web/oldtheme'

import { ButtonSecondary } from '../Buttons'

export const Wrapper = styled('ul', {
  display: 'inline-flex',
  justifyContent: 'center',
  listStyleType: 'none',
  width: '100%',
  p: 0,
  '> li': {
    mx: '0.4rem'
  }
})

export const Button = styled(ButtonSecondary, {
  alignItems: 'center',
  fontSize: '$4',
  height: '4.4rem',
  justifyContent: 'center',
  p: 0,
  width: '4.4rem'
})
