import { pagesStyle, responsiveStyle, gapX, mt } from '@web/theme'

export const confirm = pagesStyle({
  display: 'flex',
  justifyContent: 'flex-end',
  ...gapX('size-2'),
  ...mt('size-6'),
  ...responsiveStyle({
    sm: {
      ...mt('size-10')
    }
  })
})
