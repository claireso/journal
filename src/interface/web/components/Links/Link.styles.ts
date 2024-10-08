import { styled } from '@web/oldtheme'

export const Link = styled('span', {
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
