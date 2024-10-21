import { cmpStyles, tokens, radius, p, pr } from '@web/theme'

export const wrapper = cmpStyles({
  position: 'relative'
})

export const select = cmpStyles({
  appearance: 'none',
  cursor: 'pointer',
  borderWidth: '1px',
  borderStyle: 'solid',
  transition: 'border 150ms ease-out',
  outline: 'none',
  fontSize: tokens.fonts.size.base,
  fontFamily: tokens.fonts.family.sansSerif,
  background: tokens.colors.white,
  boxShadow: tokens.shadows.input,
  borderColor: tokens.colors.neutral.extralight,
  ...radius('size-1'),
  ...p('size-3'),
  ...pr('size-7'),
  selectors: {
    '&:focus': {
      borderColor: tokens.colors.neutral.light
    }
  }
})

export const icon = cmpStyles({
  position: 'absolute',
  top: '50%',
  right: tokens.sizes['size-2'],
  bottom: 0,
  height: tokens.sizes['size-4'],
  transform: 'translate(0, -50%)',
  pointerEvents: 'none'
})
