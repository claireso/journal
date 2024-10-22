import { recipe } from '@vanilla-extract/recipes'
import { pagesStyle, responsiveStyle, tokens, p, radius, gapX } from '@web/theme'

export const link = recipe({
  base: pagesStyle({
    display: 'flex',
    alignItems: 'center',
    transition: 'background 150ms ease-out, border 150ms ease-out',
    color: tokens.colors.white,
    ...radius('size-2'),
    ...p('size-3.5'),
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
          background: tokens.colors['slate-800']
        }
      })
    }
  }
})

export const text = pagesStyle({
  display: 'none',
  ...responsiveStyle({
    lg: {
      display: 'block'
    }
  })
})
