import React from 'react'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

import Icon from './Icon'

const meta: Meta<typeof Icon> = {
  title: 'Components/Icon',
  component: Icon,
  render(args) {
    return (
      <div style={{ display: 'flex', gap: '8px' }}>
        <Icon {...args} name="photo" />
        <Icon {...args} name="alert" />
        <Icon {...args} name="plus" />
      </div>
    )
  }
}

export default meta
type Story = StoryObj<typeof Icon>

export const Basic: Story = {
  args: {
    variant: 'neutral',
    size: 'md'
  }
}

export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'md'
  }
}

export const Danger: Story = {
  args: {
    variant: 'danger',
    size: 'md'
  }
}
