import { Fragment, useCallback } from 'react'
import PropTypes from 'prop-types'

import * as S from './ColorPicker.styles'

const ColorPicker = ({ colors, onSelect, selected }) => {
  const handleChange = useCallback(
    (evt) => {
      onSelect && onSelect(evt.target.value)
    },
    [onSelect]
  )

  return (
    <S.Wrapper>
      <S.Input
        type="radio"
        name="color"
        id="default"
        value=""
        onChange={handleChange}
        checked={!selected}
      />
      <S.Label htmlFor="default" style={{ color: 'var(--secondary-normal)' }}>
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
          <S.Label
            htmlFor={`color-${index}`}
            style={{ color: color }}
          >{`Color ${index + 1}`}</S.Label>
        </Fragment>
      ))}
    </S.Wrapper>
  )
}

ColorPicker.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
  selected: PropTypes.string,
  onSelect: PropTypes.func
}

export default ColorPicker
