import { pagesStyle, responsiveStyle, tokens } from '@web/theme'

export const header = pagesStyle({
  margin: `0 calc(${tokens.sizes['size-4']}*-1) ${tokens.sizes['size-4']}`,
  position: 'sticky',
  top: 0,
  zIndex: 1,
  ...responsiveStyle({
    sm: {
      margin: `0 calc(${tokens.sizes['size-8']}*-1) ${tokens.sizes['size-8']}`
    }
  })
})
