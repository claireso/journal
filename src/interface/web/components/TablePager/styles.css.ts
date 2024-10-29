import { recipe, RecipeVariants } from '@vanilla-extract/recipes'
import { cmpStyles } from '@web/theme'

export const pager = recipe({
  base: cmpStyles({}),
  variants: {
    align: {
      left: cmpStyles({
        justifySelf: 'flex-start'
      }),
      center: cmpStyles({
        justifySelf: 'center'
      }),
      right: cmpStyles({
        justifySelf: 'flex-end'
      })
    }
  },
  defaultVariants: {
    align: 'left'
  }
})

export type TablePagerVariants = RecipeVariants<typeof pager>
