import { pagesStyle, tokens, gapY, gapX, pb, pt } from '@web/theme'

export const wrapper = pagesStyle({
  display: 'flex',
  alignItems: 'center',
  selectors: {
    '& + &': {
      borderTop: `1px solid ${tokens.colors.neutral.extralight}`,
      ...pt('size-5')
    }
  },
  ...pb('size-5'),
  ...gapX('size-16')
})

export const content = pagesStyle({
  display: 'flex',
  flexDirection: 'column',
  ...gapY('size-1')
})

export const url = pagesStyle({
  wordBreak: 'break-all'
})
