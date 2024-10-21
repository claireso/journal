import { cmpStyles, tokens, radius, p } from '@web/theme'

export const input = cmpStyles({
  appearance: 'none',
  display: 'block',
  borderWidth: '1px',
  borderStyle: 'solid',
  width: '100%',
  outline: 'none',
  transition: 'border 150ms ease-out',
  background: tokens.colors.white,
  borderColor: tokens.colors.neutral.extralight,
  boxShadow: tokens.shadows.input,
  fontSize: tokens.fonts.size.base,
  ...radius('size-1'),
  ...p('size-4'),
  selectors: {
    '&:focus': {
      borderColor: tokens.colors.neutral.light
    }
  }
})
