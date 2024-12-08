import { globalStyle } from '@vanilla-extract/css'
import { cmpStyles, gap, square, px } from '@web/theme'

export const wrapper = cmpStyles({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  ...gap('size-2')
})

export const numeric = cmpStyles({
  ...px('size-1')
})

globalStyle(`${wrapper} button`, {
  placeContent: 'center',
  ...square('size-11')
})
