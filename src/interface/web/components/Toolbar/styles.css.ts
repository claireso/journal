import { recipe, RecipeVariants } from '@vanilla-extract/recipes'
import { cmpStyles, responsiveStyle, tokens, px, py } from '@web/theme'

export const toolbar = recipe({
  base: cmpStyles({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'white',
    borderBottom: `1px solid ${tokens.colors.neutral.extralight}`,
    boxShadow: `0 0 4px ${tokens.colors.neutral.extralight}`,
    minHeight: '77px',
    ...py('size-4'),
    ...px('size-4'),
    ...responsiveStyle({
      sm: {
        ...px('size-8')
      }
    })
  }),
  variants: {
    variant: {
      neutral: cmpStyles({
        background: tokens.colors.neutral['2extralight']
      })
    }
  }
})

export type ToolbarVariants = RecipeVariants<typeof toolbar>
