import { pagesStyle, tokens, radius, py, px, radiusBottom, gap } from '@web/theme'

export const wrapper = pagesStyle({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100%',
  boxShadow: `3px 3px 3px ${tokens.colors['slate-200']}`,
  border: `1px solid ${tokens.colors.neutral.extralight}`,
  transition: 'border 150ms ease-out',
  ...radius('size-1'),
  ':hover': {
    borderColor: tokens.colors.primary.light
  }
})

export const content = pagesStyle({
  display: 'flex',
  flex: 1,
  justifyContent: 'space-between',
  flexDirection: 'column',
  background: tokens.colors.white,
  ...py('size-3'),
  ...px('size-3'),
  ...gap('size-0.5'),
  ...radiusBottom('size-1')
})

export const contentInner = pagesStyle({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  ...gap('size-0.5')
})

export const date = pagesStyle({
  textAlign: 'right'
})
