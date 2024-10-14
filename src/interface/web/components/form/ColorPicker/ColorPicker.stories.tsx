import React, { useState, useCallback } from 'react'
import { action } from '@storybook/addon-actions'

import type { Meta, StoryObj } from '@storybook/react'

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
    // eslint-disable-next-line
    const [selected, setSelected] = useState('')

    const colors = ['#342d2d', '#d6c9ce', '#a3868d', '#b7b2b5', '#c58c50', '#c45c74']

    // eslint-disable-next-line
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
