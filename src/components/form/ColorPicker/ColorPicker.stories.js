import React, { useState, useCallback } from 'react'
import { action } from '@storybook/addon-actions'

import ColorPicker from './index'

export default {
  title: 'Form/ColorPicker'
}

export const Basic = () => {
  const [selected, setSelected] = useState('')

  const colors = ['#342d2d', '#d6c9ce', '#a3868d', '#b7b2b5', '#c58c50', '#c45c74']

  const onSelect = useCallback(
    (color) => {
      setSelected(color)
      action('select color')(color)
    },
    [setSelected]
  )

  return <ColorPicker colors={colors} selected={selected} onSelect={onSelect} />
}
