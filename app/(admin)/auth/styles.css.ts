import { pagesStyle, responsiveStyle, tokens, px } from '@web/theme'

export const main = pagesStyle({
  display: 'flex',
  height: '100vh',
  alignItems: 'center',
  background: tokens.colors.neutral['2extralight'],
  ...px('size-5')
})

export const content = pagesStyle({
  width: '100%',
  ...responsiveStyle({
    sm: {
      minWidth: '44rem'
    }
  })
})
