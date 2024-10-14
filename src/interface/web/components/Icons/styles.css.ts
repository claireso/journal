import { recipe, RecipeVariants } from '@vanilla-extract/recipes'
import { cmpStyles, tokens, square } from '@web/theme'

export const icon = recipe({
  base: cmpStyles({
    transition: 'color 150ms ease-out'
  }),
  variants: {
    size: {
      xs: cmpStyles({
        ...square('size-3.5')
      }),
      sm: cmpStyles({
        ...square('size-4')
      }),
      md: cmpStyles({
        ...square('size-5')
      }),
      lg: cmpStyles({
        ...square('size-6')
      })
    },
    variant: {
      neutral: cmpStyles({
        color: tokens.colors.neutral.extradark
      }),
      primary: cmpStyles({
        color: tokens.colors.primary.base
      }),
      danger: cmpStyles({
        color: tokens.colors.danger.base
      }),
      default: cmpStyles({
        color: 'currentcolor'
      })
    }
  },
  defaultVariants: {
    size: 'md',
    variant: 'default'
  }
})

export type IconVariants = RecipeVariants<typeof icon>
