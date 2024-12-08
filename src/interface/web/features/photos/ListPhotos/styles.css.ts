import { pagesStyle, my, responsiveStyle } from '@web/theme'

export const listPhotosPager = pagesStyle({
  gridColumn: '1 / -1',
  ...my('size-4'),
  ...responsiveStyle({
    md: {
      ...my('size-24')
    }
  })
})
