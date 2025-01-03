import React, { Fragment, useCallback } from 'react'

import { tokens } from '@web/theme/core/tokens.css'
import * as cls from './styles.css'

interface ColorPickerProps {
  colors: string[]
  disabled: boolean
  onSelect?: (color: string) => void
  selected?: string | null
}

const ColorPicker = ({ colors, onSelect, selected, disabled }: ColorPickerProps) => {
  const handleChange = useCallback(
    (evt: React.FormEvent<HTMLInputElement>) => {
      if (onSelect) {
        onSelect(evt.currentTarget.value)
      }
    },
    [onSelect]
  )

  return (
    <div className={cls.wrapper}>
      <input
        className={cls.input}
        type="radio"
        name="color"
        id="default"
        value=""
        onChange={handleChange}
        checked={!selected && !disabled}
        disabled={disabled}
      />
      <label className={cls.label} htmlFor="default" style={{ color: tokens.colors.neutral['2extralight'] }}>
        Transparent
      </label>
      {colors.map((color, index) => (
        <Fragment key={index}>
          <input
            className={cls.input}
            type="radio"
            name="color"
            id={`color-${index}`}
            value={color}
            onChange={handleChange}
            checked={selected === color}
            disabled={disabled}
          />
          <label className={cls.label} htmlFor={`color-${index}`} style={{ color: color }}>{`Color ${index}`}</label>
        </Fragment>
      ))}
    </div>
  )
}

export default ColorPicker
