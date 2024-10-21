import { keyframes } from '@vanilla-extract/css'
import { recipe, RecipeVariants } from '@vanilla-extract/recipes'
import { cmpStyles, tokens, mx, my, square } from '@web/theme'

const pulse = keyframes({
  '0%': { opacity: '0' },
  '100%': { opacity: '1' }
})

export const loader = recipe({
  base: cmpStyles({
    display: 'block',
    animation: `${pulse} 800ms ease-in-out infinite alternate`,
    selectors: {
      '&::after': {
        borderRadius: '50%',
        content: `''`,
        display: 'block',
        width: '100%',
        height: '100%'
      }
    },
    ...my('size-5'),
    ...mx('size-auto'),
    ...square('size-3')
  }),
  variants: {
    variant: {
      default: cmpStyles({
        selectors: {
          '&::after': {
            background: tokens.colors.neutral.dark
          }
        }
      }),
      primary: cmpStyles({
        selectors: {
          '&::after': {
            background: tokens.colors.primary.base
          }
        }
      })
    }
  },
  defaultVariants: {
    variant: 'primary'
  }
})

export type LoaderVariants = RecipeVariants<typeof loader>
