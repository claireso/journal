import { recipe, RecipeVariants } from '@vanilla-extract/recipes'
import { cmpStyles, tokens } from '@web/theme'

export const text = recipe({
  base: {},
  variants: {
    size: {
      xxs: cmpStyles({
        fontSize: tokens.fonts.size.xxs
      }),
      xs: cmpStyles({
        fontSize: tokens.fonts.size.xs
      }),
      sm: cmpStyles({
        fontSize: tokens.fonts.size.sm
      }),
      base: cmpStyles({
        fontSize: tokens.fonts.size.base
      }),
      lg: cmpStyles({
        fontSize: tokens.fonts.size.lg
      }),
      xl: cmpStyles({
        fontSize: tokens.fonts.size.xl
      }),
      '2xl': cmpStyles({
        fontSize: tokens.fonts.size['2xl']
      }),
      '3xl': cmpStyles({
        fontSize: tokens.fonts.size['3xl']
      })
    },
    color: {
      base: cmpStyles({
        color: tokens.colors['text-base']
      }),
      primary: cmpStyles({
        color: tokens.colors.primary.base
      }),
      neutral: cmpStyles({
        color: tokens.colors.neutral.base
      }),
      light: cmpStyles({
        color: tokens.colors.white
      })
    },
    italic: {
      true: cmpStyles({
        fontStyle: tokens.fonts.style.italic
      })
    },
    weight: {
      thin: cmpStyles({
        fontWeight: tokens.fonts.weight.thin
      }),
      extralight: cmpStyles({
        fontWeight: tokens.fonts.weight.extralight
      }),
      light: cmpStyles({
        fontWeight: tokens.fonts.weight.light
      }),
      normal: cmpStyles({
        fontWeight: tokens.fonts.weight.normal
      }),
      medium: cmpStyles({
        fontWeight: tokens.fonts.weight.medium
      }),
      semibold: cmpStyles({
        fontWeight: tokens.fonts.weight.semibold
      }),
      bold: cmpStyles({
        fontWeight: tokens.fonts.weight.bold
      }),
      extrabold: cmpStyles({
        fontWeight: tokens.fonts.weight.extrabold
      }),
      black: cmpStyles({
        fontWeight: tokens.fonts.weight.black
      })
    }
  },
  defaultVariants: {
    size: 'base',
    color: 'base',
    weight: 'normal',
    italic: false
  }
})

export type TextVariants = RecipeVariants<typeof text>
