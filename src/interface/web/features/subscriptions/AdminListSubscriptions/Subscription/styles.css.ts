import { pagesStyle, tokens, gap, gapY, pb, pt, responsiveStyle } from '@web/theme'

export const wrapper = pagesStyle({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  selectors: {
    '& + &': {
      borderTop: `1px solid ${tokens.colors.neutral.extralight}`,
      ...pt('size-5')
    }
  },
  ...gap('size-3'),
  ...pb('size-5'),
  ...responsiveStyle({
    lg: {
      flexDirection: 'row',
      alignItems: 'center',
      ...gap('size-16')
    }
  })
})

export const content = pagesStyle({
  display: 'flex',
  flexDirection: 'column',
  ...gapY('size-1')
})

export const url = pagesStyle({
  wordBreak: 'break-all'
})
