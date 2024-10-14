import { recipe, RecipeVariants } from '@vanilla-extract/recipes'
import { cmpStyles, tokens } from '@web/theme'

export const link = recipe({
  base: cmpStyles({
    textUnderlineOffset: tokens.sizes['size-1'],
    ':hover': {
      textDecoration: 'underline'
    },
    ':focus': {
      textDecoration: 'underline'
    }
  }),
  variants: {
    variant: {
      default: cmpStyles({
        color: tokens.colors['text-base']
      }),
      primary: cmpStyles({
        color: tokens.colors.primary.base
      })
    }
  },
  defaultVariants: {
    variant: 'default'
  }
})

export type LinkVariants = RecipeVariants<typeof link>
