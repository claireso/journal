import { recipe } from '@vanilla-extract/recipes'
import { cmpStyles, mb, gapX, gapY } from '@web/theme'

export const wrapper = recipe({
  base: cmpStyles({
    display: 'flex',
    alignItems: 'flex-start',
    ...mb('size-6')
  }),
  variants: {
    inline: {
      true: cmpStyles({
        alignItems: 'center',
        flexDirection: 'row',
        ...gapX('size-3.5')
      }),
      false: cmpStyles({
        flexDirection: 'column',
        alignItems: 'stretch',
        ...gapY('size-3')
      })
    }
  },
  defaultVariants: {
    inline: false
  }
})
