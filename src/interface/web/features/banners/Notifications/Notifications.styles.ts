import { styled } from '@web/theme'

export const ButtonSubscribe = styled('a', {
  color: 'inherit',
  textDecoration: 'none',
  '&:before': {
    content: '',
    display: 'block',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  '&:hover': {
    borderBottom: '1px solid currentColor'
  }
})
