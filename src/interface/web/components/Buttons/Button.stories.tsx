import type { Meta, StoryObj } from '@storybook/react-webpack5'
import React from 'react'
import { action } from 'storybook/actions'

import Icon from '../Icons'
import Button from './Button'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  args: {
    onClick: action('clicked'),
    loading: false,
    block: false,
    outline: false,
    disabled: false,
    size: 'md'
  }
}

export default meta
type Story = StoryObj<typeof Button>

export const Basic: Story = {
  args: {
    children: 'Cancel',
    variant: 'neutral'
  }
}

export const Primary: Story = {
  args: {
    children: 'Add new photo',
    variant: 'primary'
  }
}

export const Danger: Story = {
  args: {
    children: 'Delete photo',
    variant: 'danger'
  }
}

export const WithIcon: Story = {
  args: {
    children: <Icon name="plus" />,
    variant: 'neutral'
  }
}

export const Block: Story = {
  args: {
    children: 'Add new photo',
    variant: 'primary',
    block: true
  }
}

export const BlockLoading: Story = {
  args: {
    children: 'Add new photo',
    variant: 'primary',
    block: true,
    loading: true
  }
}
