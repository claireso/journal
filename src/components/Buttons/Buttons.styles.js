import { styled } from '@theme'

import { Loader } from '../Loader'

export const DefaultButton = styled('button', {
  appearance: 'none',
  background: 'none',
  border: 'none',
  color: 'currentColor',
  cursor: 'pointer',
  display: 'inline-flex',
  fontFamily: '$sansSerif',
  outline: 'none',
  padding: 0,
  margin: 0
})

export const Button = styled(DefaultButton, {
  borderRadius: '$1',
  fontSize: '$2',
  lineHeight: '1.3333333', // mmm...
  p: '$4',
  transition: '$background',
  '& > svg': {
    m: '0 -$1 0 $1'
  },
  '& + &': {
    mb: '$2',
    ml: '$2'
  },
  variants: {
    color: {
      primary: {
        background: '$primary100',
        color: '$white',
        '&:hover': {
          background: '$primary200'
        }
      },
      secondary: {
        background: '$secondary200',
        color: '$gray600',
        '&:hover': {
          background: '$secondary300'
        }
        // [`& + ${DefaultButton}, ${DefaultButton} + &, & + &`]: {
        //   marginLeft: '$2'
        // }
      }
    }
  }
})

export const ButtonLoading = styled(Button, {
  p: '1.9rem $4',
  cursor: 'default',
  pointerEvents: 'none',
  [`${Loader}`]: {
    m: 0,
    '&::after': {
      background: '$white'
    }
  }
})

export const ButtonIcon = styled(Button, {
  background: 'none',
  color: 'inherit',
  padding: '$2',
  '> svg': {
    margin: 0
  },
  '& + &': {
    margin: 0
  }
})
