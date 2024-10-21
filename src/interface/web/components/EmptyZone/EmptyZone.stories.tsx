import type { Meta, StoryObj } from '@storybook/react'

import EmptyZone from './EmptyZone'

const meta: Meta<typeof EmptyZone> = {
  title: 'Components/EmptyZone',
  component: EmptyZone
}

export default meta
type Story = StoryObj<typeof EmptyZone>

export const Basic: Story = {
  args: {
    children: 'You haven’t published any photo yet'
  }
}
