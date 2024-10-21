import { pagesStyle, responsiveStyle } from '@web/theme'

export const text = pagesStyle({
  display: 'none',
  ...responsiveStyle({
    lg: {
      display: 'initial'
    }
  })
})
