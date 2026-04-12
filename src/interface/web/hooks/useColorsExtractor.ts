import { useState, useEffect, useCallback } from 'react'
import { getPaletteSync } from 'colorthief'

const useColorsExtractor = (initialPhoto?: string) => {
  const [colors, setColors] = useState<string[]>([])

  const extractColors = useCallback(
    (path: string) => {
      const img = new Image()

      img.src = path

      img.onload = function () {
        const palette = getPaletteSync(img, { colorSpace: 'rgb' })
        if (palette) {
          const colors = palette.map((color) => color.hex())
          setColors(colors)
        }
      }
    },
    [setColors]
  )

  useEffect(() => {
    if (initialPhoto) {
      extractColors(initialPhoto)
    }
  }, [initialPhoto, extractColors])

  return [colors, extractColors] as const
}

export default useColorsExtractor
