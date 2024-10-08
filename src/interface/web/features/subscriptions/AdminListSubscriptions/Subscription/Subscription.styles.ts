import { styled } from '@web/oldtheme'

export const SubscriptionWrapper = styled('li', {
  alignItems: 'center',
  display: 'flex',
  fontSize: '$4',
  listStyle: 'none',
  p: '$4',
  transition: '$background',
  '&:hover': {
    background: '$secondary100'
  },
  '& + &': {
    borderTop: '1px solid $secondary200'
  },
  dl: {
    flex: 'auto',
    m: 0,
    pr: '$8'
  },
  dt: {
    fontWeight: '$bold',
    m: '0 0 $1'
  },
  dd: {
    m: '0 0 1rem',
    wordWrap: 'break-word',
    wordBreak: 'break-all'
  }
})

export const SubscriptionTools = styled('p', {
  transition: '$opacity',
  button: {
    opacity: '0.5',
    transition: '$opacity',
    '&:hover': {
      opacity: 1
    }
  }
})
