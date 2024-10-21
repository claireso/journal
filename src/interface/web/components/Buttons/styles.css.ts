import { recipe, RecipeVariants } from '@vanilla-extract/recipes'
import { cmpStyles, radius, tokens, gap, p, py, px } from '@web/theme'

export const button = recipe({
  base: cmpStyles({
    display: 'inline-flex',
    alignItems: 'center',
    outline: 'none',
    transition: 'background 250ms ease-out',
    ...radius('size-1'),
    ...gap('size-1')
  }),

  variants: {
    variant: {
      neutral: cmpStyles({
        background: tokens.colors.neutral['2extralight'],
        color: tokens.colors['text-base'],
        ':hover': {
          background: tokens.colors.neutral['3extralight']
        }
      }),
      primary: cmpStyles({
        background: tokens.colors.primary.base,
        color: tokens.colors.white,
        ':hover': {
          background: tokens.colors.primary.light
        }
      }),
      danger: cmpStyles({
        background: tokens.colors.danger.base,
        color: tokens.colors.white,
        ':hover': {
          background: tokens.colors.danger.light
        }
      }),
      dark: cmpStyles({
        background: tokens.colors.neutral.extradark,
        color: tokens.colors.white,
        ':hover': {
          background: tokens.colors.neutral.dark,
          color: tokens.colors.white
        }
      })
    },
    size: {
      sm: cmpStyles({
        lineHeight: 1.334,
        fontSize: tokens.fonts.size.xs,
        ...p('size-2')
      }),
      md: cmpStyles({
        lineHeight: 1.143,
        fontSize: tokens.fonts.size.sm,
        ...p('size-3.5')
      }),

      lg: cmpStyles({
        lineHeight: 1.286,
        fontSize: tokens.fonts.size.sm,
        ...py('size-4.5'),
        ...px('size-8')
      })
    },
    block: {
      true: cmpStyles({
        width: '100%',
        justifyContent: 'center'
      })
    },
    loading: {
      true: cmpStyles({
        pointerEvents: 'none'
      })
    },
    outline: {
      true: cmpStyles({
        border: '1px solid transparent',
        background: 'transparent'
      })
    }
  },
  compoundVariants: [
    {
      variants: {
        variant: 'neutral',
        outline: true
      },
      style: cmpStyles({
        color: tokens.colors.neutral['2extralight'],
        borderColor: tokens.colors.neutral['2extralight'],
        ':hover': {
          color: tokens.colors['text-base'],
          background: tokens.colors.neutral['2extralight'],
          borderColor: tokens.colors.neutral['2extralight']
        }
      })
    },
    {
      variants: {
        variant: 'primary',
        outline: true
      },
      style: cmpStyles({
        color: tokens.colors.primary.base,
        borderColor: tokens.colors.primary.base,
        ':hover': {
          color: tokens.colors.white,
          background: tokens.colors.primary.base
        }
      })
    },
    {
      variants: {
        variant: 'danger',
        outline: true
      },
      style: cmpStyles({
        color: tokens.colors.danger.base,
        borderColor: tokens.colors.danger.base,
        ':hover': {
          color: tokens.colors.white,
          background: tokens.colors.danger.base
        }
      })
    },
    {
      variants: {
        variant: 'dark',
        outline: true
      },
      style: cmpStyles({
        color: tokens.colors.neutral.extradark,
        borderColor: tokens.colors.neutral.extradark,
        ':hover': {
          color: tokens.colors.white,
          background: tokens.colors.neutral.extradark,
          borderColor: tokens.colors.neutral.extradark
        }
      })
    }
  ],
  defaultVariants: {
    variant: 'neutral',
    size: 'md',
    block: false,
    outline: false
  }
})

export type ButtonVariants = RecipeVariants<typeof button>
