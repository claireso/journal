import { tokens } from '../core/tokens.css'

type Size = keyof typeof tokens.sizes

export const m = (size: Size) => ({
  margin: tokens.sizes[size]
})

export const mx = (size: Size) => ({
  marginLeft: tokens.sizes[size],
  marginRight: tokens.sizes[size]
})

export const my = (size: Size) => ({
  marginTop: tokens.sizes[size],
  marginBottom: tokens.sizes[size]
})

export const mb = (size: Size) => ({
  marginBottom: tokens.sizes[size]
})

export const mt = (size: Size) => ({
  marginTop: tokens.sizes[size]
})

export const mr = (size: Size) => ({
  marginRight: tokens.sizes[size]
})

export const ml = (size: Size) => ({
  marginLeft: tokens.sizes[size]
})

export const p = (size: Size) => ({
  padding: tokens.sizes[size]
})

export const px = (size: Size) => ({
  paddingLeft: tokens.sizes[size],
  paddingRight: tokens.sizes[size]
})

export const py = (size: Size) => ({
  paddingTop: tokens.sizes[size],
  paddingBottom: tokens.sizes[size]
})

export const pb = (size: Size) => ({
  paddingBottom: tokens.sizes[size]
})

export const pt = (size: Size) => ({
  paddingTop: tokens.sizes[size]
})

export const pr = (size: Size) => ({
  paddingRight: tokens.sizes[size]
})

export const pl = (size: Size) => ({
  paddingLeft: tokens.sizes[size]
})

export const square = (size: Size) => ({
  width: tokens.sizes[size],
  height: tokens.sizes[size]
})

export const gap = (size: Size) => ({
  gap: tokens.sizes[size]
})

export const gapX = (size: Size) => ({
  columnGap: tokens.sizes[size]
})

export const gapY = (size: Size) => ({
  rowGap: tokens.sizes[size]
})
