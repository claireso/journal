import { keyframes } from '@vanilla-extract/css'
import { recipe, RecipeVariants } from '@vanilla-extract/recipes'
import { cmpStyles, tokens, square } from '@web/theme'

const loop = keyframes({
  '0%': { rotate: '0' },
  '100%': { rotate: '360deg' }
})

export const spinner = recipe({
  base: cmpStyles({
    borderStyle: 'solid',
    animation: `${loop} 450ms cubic-bezier(.17,.67,.78,1.02) infinite`,
    borderRadius: '50%'
  }),
  variants: {
    variant: {
      default: cmpStyles({
        borderColor: tokens.colors.neutral.dark,
        borderRightColor: tokens.colors.neutral.light
      }),
      primary: cmpStyles({
        borderColor: tokens.colors.primary.base,
        borderRightColor: tokens.colors.primary.extralight
      }),
      currentcolor: cmpStyles({
        borderColor: 'currentcolor',
        borderRightColor: 'color-mix(in srgb, currentColor 50%, transparent)'
      })
    },
    size: {
      sm: cmpStyles({
        borderWidth: tokens.sizes['size-0.5'],
        ...square('size-4')
      }),
      md: cmpStyles({
        borderWidth: tokens.sizes['size-0.5'],
        ...square('size-4')
      }),
      lg: cmpStyles({
        borderWidth: tokens.sizes['size-0.5'],
        ...square('size-4.5')
      }),
      xl: cmpStyles({
        borderWidth: tokens.sizes['size-1'],
        ...square('size-6')
      })
    }
  },
  defaultVariants: {
    variant: 'primary',
    size: 'xl'
  }
})

export type SpinnerVariants = RecipeVariants<typeof spinner>
