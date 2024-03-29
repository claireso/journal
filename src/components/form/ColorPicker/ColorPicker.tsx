import React, { Fragment, useCallback } from 'react'

import * as S from './ColorPicker.styles'

interface ColorPickerProps {
  colors: string[]
  onSelect?: (color: string) => void
  selected?: string | null
}

const ColorPicker = ({ colors, onSelect, selected }: ColorPickerProps) => {
  const handleChange = useCallback(
    (evt: React.FormEvent<HTMLInputElement>) => {
      onSelect && onSelect(evt.currentTarget.value)
    },
    [onSelect]
  )

  return (
    <S.Wrapper>
      <S.Input type="radio" name="color" id="default" value="" onChange={handleChange} checked={!selected} />
      <S.Label htmlFor="default" css={{ color: '$secondary200' }}>
        Transparent
      </S.Label>
      {colors.map((color, index) => (
        <Fragment key={index}>
          <S.Input
            type="radio"
            name="color"
            id={`color-${index}`}
            value={color}
            onChange={handleChange}
            checked={selected === color}
          />
          <S.Label htmlFor={`color-${index}`} style={{ color: color }}>{`Color ${index}`}</S.Label>
        </Fragment>
      ))}
    </S.Wrapper>
  )
}

export default ColorPicker
