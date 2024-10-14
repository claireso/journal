import type { StyleRule } from '@vanilla-extract/css'
import { style } from '@vanilla-extract/css'
import { default as breakpoints } from '../core/breakpoints.css'

export const responsiveStyle = ({
  xs,
  sm,
  md,
  lg,
  xl,
  extraXl
}: {
  xs?: StyleRule
  sm?: StyleRule
  md?: StyleRule
  lg?: StyleRule
  xl?: StyleRule
  extraXl?: StyleRule
}) => ({
  '@media': {
    ...(xs && { [`screen`]: xs }),
    ...(sm && { [`screen and (min-width: ${breakpoints.get('sm')})`]: sm }),
    ...(md && { [`screen and (min-width: ${breakpoints.get('md')})`]: md }),
    ...(lg && { [`screen and (min-width: ${breakpoints.get('lg')})`]: lg }),
    ...(xl && { [`screen and (min-width: ${breakpoints.get('xl')})`]: xl }),
    ...(extraXl && { [`screen and (min-width: ${breakpoints.get('2xl')})`]: extraXl })
  }
})
