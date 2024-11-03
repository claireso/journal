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

// export const actions = pagesStyle({
//   position: 'absolute',
//   top: 0,
//   left: 0,
//   right: 0,
//   bottom: 0,
//   // background: 'rgba(255, 255, 255, 0.7)',
//   background: `color-mix(in srgb, ${tokens.colors.neutral['2extralight']} 75%, transparent)`,
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
//   visibility: 'hidden',
//   opacity: 0,
//   transition: 'opacity 250ms ease-out',
//   willChange: 'opacity',
//   ...gap('size-2'),
//   selectors: {
//     [`${wrapper}:hover &`]: {
//       visibility: 'visible',
//       opacity: 1
//     }
//   }
// })
