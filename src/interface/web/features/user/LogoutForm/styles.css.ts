import { pagesStyle, responsiveStyle } from '@web/theme'

export const icon = pagesStyle({
  ...responsiveStyle({
    lg: {
      display: 'none'
    }
  })
})

export const text = pagesStyle({
  display: 'none',
  ...responsiveStyle({
    lg: {
      display: 'initial'
    }
  })
})
