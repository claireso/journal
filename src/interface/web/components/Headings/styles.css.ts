import { cmpStyles, tokens, m } from '@web/theme'

export const heading1 = cmpStyles({
  fontSize: tokens.fonts.size['3xl'],
  fontWeight: tokens.fonts.weight.semibold,
  ...m('size-0')
})

export const heading2 = cmpStyles({
  fontSize: tokens.fonts.size['2xl'],
  fontWeight: tokens.fonts.weight.semibold,
  ...m('size-0')
})

export const heading3 = cmpStyles({
  fontSize: tokens.fonts.size.xl,
  fontWeight: tokens.fonts.weight.semibold,
  ...m('size-0')
})

export const heading4 = cmpStyles({
  fontSize: tokens.fonts.size.lg,
  fontWeight: tokens.fonts.weight.semibold,
  ...m('size-0')
})

export const heading5 = cmpStyles({
  fontSize: tokens.fonts.size.base,
  fontWeight: tokens.fonts.weight.semibold,
  ...m('size-0')
})

export const heading6 = cmpStyles({
  fontSize: tokens.fonts.size.sm,
  fontWeight: tokens.fonts.weight.semibold,
  ...m('size-0')
})
