import React, { useState, useCallback } from 'react'
import { action } from '@storybook/addon-actions'

import ColorPicker from './index'

const params = {
  title: 'Form/ColorPicker',
  argTypes: { disabled: { control: 'boolean' } },
  args: {
    disabled: false
  }
}

export default params

export const Basic = (args) => {
  const { disabled } = args
  const [selected, setSelected] = useState('')

  const colors = ['#342d2d', '#d6c9ce', '#a3868d', '#b7b2b5', '#c58c50', '#c45c74']

  const onSelect = useCallback(
    (color) => {
      setSelected(color)
      action('select color')(color)
    },
    [setSelected]
  )

  return <ColorPicker disabled={disabled} colors={colors} selected={selected} onSelect={onSelect} />
}
