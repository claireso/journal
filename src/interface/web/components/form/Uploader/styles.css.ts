import { recipe } from '@vanilla-extract/recipes'
import { cmpStyles, tokens, p, gap, mx, my, radius } from '@web/theme'

export const wrapper = cmpStyles({
  overflow: 'hidden',
  position: 'relative',
  border: `1px solid ${tokens.colors.neutral.extralight}`,
  boxShadow: tokens.shadows.input,
  ...radius('size-1')
})

export const preview = recipe({
  base: cmpStyles({
    transition: 'opacity 120ms ease-out, background 150ms ease-out',
    ...p('size-5')
  }),
  variants: {
    processing: {
      true: cmpStyles({
        opacity: 0.5
      })
    }
  }
})

export const previewImage = cmpStyles({
  display: 'block',
  maxWidth: '100%',
  maxHeight: '17rem',
  ...mx('size-auto'),
  ...my('size-0')
})

export const content = cmpStyles({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  ...p('size-5'),
  ...gap('size-1')
})

export const input = cmpStyles({
  bottom: 0,
  cursor: 'pointer',
  left: 0,
  opacity: 0,
  position: 'absolute',
  right: 0,
  top: 0,
  width: '100%'
})
