import { pagesStyle, tokens, px, py, pb } from '@web/theme'

export const sidebar = pagesStyle({
  position: 'fixed',
  top: 0,
  left: 0,
  bottom: 0,
  width: '22rem',
  display: 'flex',
  flexDirection: 'column',
  color: 'white',
  background: tokens.colors.neutral.extradark
})

export const sidebarHeader = pagesStyle({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  WebkitFontSmoothing: 'antialiased',
  minHeight: '77px',
  ...px('size-3'),
  ...py('size-4')
})

export const sidebarContent = pagesStyle({
  flexGrow: 1,
  ...px('size-3'),
  ...py('size-8')
})

export const sidebarFooter = pagesStyle({
  ...px('size-3'),
  ...py('size-4')
})

export const content = pagesStyle({
  position: 'relative',
  marginLeft: '22rem',
  borderLeft: `1px solid ${tokens.colors.neutral.extralight}`,
  minHeight: '100vh',
  background: tokens.colors.neutral['2extralight'],
  ...px('size-8'),
  ...pb('size-15')
})
