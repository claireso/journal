import { pagesStyle, gap, mb, responsiveStyle } from '@web/theme'

export const list = pagesStyle({
  display: 'flex',
  flexWrap: 'wrap',
  ...gap('size-4'),
  ...mb('size-15'),
  ...responsiveStyle({
    sm: {
      ...gap('size-6')
    }
  })
})

export const listItem = pagesStyle({
  flex: '1 0 100%',
  ...responsiveStyle({
    sm: {
      flex: '1 0 48%'
    },
    xl: {
      flex: '1 0 23%'
    },
    wide: {
      flex: '1 0 15%'
    }
  })
})
