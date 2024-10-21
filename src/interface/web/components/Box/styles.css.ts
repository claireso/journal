import { cmpStyles, tokens, my, mx, p, radius } from '@web/theme'

export const wrapper = cmpStyles({
  background: tokens.colors.white,
  border: `1px solid ${tokens.colors.neutral.extralight}`,
  boxShadow: tokens.shadows.input,
  maxWidth: '40rem',
  ...my('size-0'),
  ...mx('size-auto'),
  ...p('size-10'),
  ...radius('size-1')
})
