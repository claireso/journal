import { action } from 'storybook/actions'

import type { Meta, StoryObj } from '@storybook/react-webpack5'

import FlashGroup from './FlashGroup'

const meta: Meta<typeof FlashGroup> = {
  title: 'Components/FlashGroup',
  component: FlashGroup,
  args: {
    onClose: action('close message'),
    messages: [
      { status: 'default', message: 'Default message' },
      { status: 'default', message: 'Default message' },
      { status: 'success', message: 'Success message' },
      { status: 'success', message: 'Success message' },
      { status: 'error', message: 'Error message' },
      { status: 'error', message: 'Error message' },
      { status: 'info', message: 'Info message' },
      { status: 'info', message: 'Info message' }
    ]
  }
}

export default meta
type Story = StoryObj<typeof FlashGroup>

export const Basic: Story = {}
