import { globalStyle } from '@vanilla-extract/css'
import { cmpStyles, gap, square } from '@web/theme'

export const wrapper = cmpStyles({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  ...gap('size-2')
})

globalStyle(`${wrapper} button`, {
  placeContent: 'center',
  ...square('size-11')
})
