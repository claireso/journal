import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'
import { pagesStyle, tokens, p, radius, gapX } from '@web/theme'

export const link = recipe({
  base: pagesStyle({
    // borderLeftWidth: tokens.sizes['size-1'],
    // borderLeftStyle: 'solid',
    display: 'flex',
    alignItems: 'center',
    lineHeight: 1.3,
    transition: 'background 150ms ease-out, border 150ms ease-out',
    color: tokens.colors.white,
    ...p('size-2'),
    ...radius('size-2'),
    ...gapX('size-2')
  }),
  variants: {
    active: {
      true: pagesStyle({
        background: tokens.colors['yellow-300'],
        color: tokens.colors['text-base']
      }),
      false: pagesStyle({
        ':hover': {
          background: tokens.colors['slate-50'],
          color: tokens.colors['text-base']
        }
      })
    }
  }
})
