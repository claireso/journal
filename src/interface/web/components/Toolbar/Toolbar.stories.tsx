import type { Meta, StoryObj } from '@storybook/react'

import Toolbar from './Toolbar'

const meta: Meta<typeof Toolbar> = {
  title: 'Components/Toolbar',
  component: Toolbar
}

export default meta
type Story = StoryObj<typeof Toolbar>

export const Basic: Story = {
  args: {
    children: 'content'
  }
}
