import { tokens } from '../core/tokens.css'

type Size = keyof typeof tokens.sizes

export const radius = (size: Size) => ({
  borderRadius: tokens.sizes[size]
})

export const radiusTop = (size: Size) => ({
  borderTopLeftRadius: tokens.sizes[size],
  borderTopRightRadius: tokens.sizes[size]
})

export const radiusBottom = (size: Size) => ({
  borderBottomLeftRadius: tokens.sizes[size],
  borderBottomRightRadius: tokens.sizes[size]
})
