import { styled } from '@theme'

import { Loader } from '@components/Loader'

export const ButtonSubmit = styled('input', {
  appearance: 'none',
  background: '$primary100',
  border: 'none',
  borderRadius: '$3',
  color: '$white',
  cursor: 'pointer',
  display: 'block',
  fontSize: '$4',
  lineHeight: 1,
  m: '$7 auto 0',
  outline: 'none',
  p: '$4 5.2rem',
  transition: '$background',

  '&:hover': {
    background: '$primary200'
  }
})

export const ButtonLoading = styled('div', {
  m: '$7 0 0',
  py: '1.8rem',
  [`${Loader}`]: {
    m: '0 auto'
  }
})
