import { useState, useEffect, useCallback } from 'react'
import ColorThief from 'colorthief'

const rgbToHex = (r, g, b) =>
  '#' +
  [r, g, b]
    .map((x) => {
      const hex = x.toString(16)
      return hex.length === 1 ? '0' + hex : hex
    })
    .join('')

const useColorsExtractor = (initialPhoto) => {
  const [colors, setColors] = useState()

  const extractColors = useCallback(
    (path) => {
      const img = new Image()

      img.src = path

      img.onload = function () {
        const colorThief = new ColorThief()
        const colors = colorThief
          .getPalette(img)
          .map(([r, g, b]) => rgbToHex(r, g, b))
        setColors(colors)
      }
    },
    [setColors]
  )

  useEffect(() => {
    if (initialPhoto) {
      extractColors(initialPhoto)
    }
  }, [initialPhoto, extractColors])

  return [colors, extractColors]
}

export default useColorsExtractor
