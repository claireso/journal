import { pagesStyle, tokens } from '@web/theme'

export const wrapper = pagesStyle({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  background: tokens.colors.info.light
})

export const title = pagesStyle({
  fontSize: '20vw',
  fontWeight: tokens.fonts.weight.semibold
})

export const back = pagesStyle({
  position: 'fixed',
  top: tokens.sizes['size-8'],
  left: tokens.sizes['size-8']
})
