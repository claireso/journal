import { cmpStyles, tokens, p, ml, square } from '@web/theme'

export const wrapper = cmpStyles({
  background: `color-mix(in srgb, ${tokens.colors.neutral.extradark} 50%, transparent)`,
  bottom: 0,
  overflow: 'auto',
  position: 'fixed',
  left: '22rem',
  right: 0,
  top: 0,
  willChange: 'opacity',
  zIndex: 1,
  overflowX: 'hidden'
})

export const inner = cmpStyles({
  boxShadow: '0 0px 11px #898c8e',
  maxWidth: '45rem',
  minHeight: 'calc(100vh)',
  background: tokens.colors.white,
  overflow: 'hidden',
  ...ml('size-auto')
})

export const content = cmpStyles({
  ...p('size-8')
})
