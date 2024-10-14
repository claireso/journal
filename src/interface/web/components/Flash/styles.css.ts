import { recipe, RecipeVariants } from '@vanilla-extract/recipes'
import { cmpStyles, p, px, tokens } from '@web/theme'

export const wrapper = recipe({
  base: cmpStyles({
    position: 'relative',
    textAlign: 'center',
    opacity: 0,
    fontSize: tokens.fonts.size.sm,
    ...p('size-5')
  }),
  variants: {
    status: {
      default: cmpStyles({
        color: tokens.colors.primary.base,
        background: tokens.colors.primary.extralight,
        borderColor: tokens.colors.primary.light
      }),
      error: cmpStyles({
        color: tokens.colors.danger.base,
        background: tokens.colors.danger.extralight,
        borderColor: tokens.colors.danger.light
      }),
      success: cmpStyles({
        color: tokens.colors.success.base,
        background: tokens.colors.success.extralight,
        borderColor: tokens.colors.success.light
      }),
      info: cmpStyles({
        color: tokens.colors['text-base'],
        background: tokens.colors.info.extralight,
        borderColor: tokens.colors.info.light
      })
    },
    separator: {
      true: cmpStyles({
        borderTopStyle: 'solid',
        borderTopWidth: '2px'
      })
    }
  },
  defaultVariants: {
    status: 'default',
    separator: false
  }
})

export type FlashVariants = RecipeVariants<typeof wrapper>

export const buttonClose = cmpStyles({
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  right: 0,
  top: 0,
  bottom: 0,
  ...px('size-5')
})
