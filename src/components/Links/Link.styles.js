import { styled } from '@theme'

export const Link = styled('a', {
  textDecoration: 'none',
  variants: {
    color: {
      primary: {
        color: '$primary100',
        '&:hover, &:focus': {
          textDecoration: 'underline',
          textUnderlineOffset: '0.4rem'
        }
      }
    }
  }
})
