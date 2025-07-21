import React, { useState, useCallback } from 'react'
import { action } from 'storybook/actions'

import type { Meta, StoryObj } from '@storybook/react-webpack5'

import ColorPicker from './ColorPicker'

const meta: Meta<typeof ColorPicker> = {
  title: 'Form/ColorPicker',
  component: ColorPicker
}

export default meta
type Story = StoryObj<typeof ColorPicker>

export const Basic: Story = {
  render(args) {
    const { disabled } = args

    const [selected, setSelected] = useState('')

    const colors = ['#342d2d', '#d6c9ce', '#a3868d', '#b7b2b5', '#c58c50', '#c45c74']

    const onSelect = useCallback(
      (color: string) => {
        setSelected(color)
        action('select color')(color)
      },
      [setSelected]
    )

    return <ColorPicker disabled={disabled} colors={colors} selected={selected} onSelect={onSelect} />
  }
}
