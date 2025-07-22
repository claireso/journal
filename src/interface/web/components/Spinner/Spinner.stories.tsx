import type { Meta, StoryObj } from '@storybook/react-webpack5'

import Spinner from './Spinner'

const meta: Meta<typeof Spinner> = {
  title: 'Components/Spinner',
  component: Spinner
}

export default meta
type Story = StoryObj<typeof Spinner>

export const Basic: Story = {
  args: {
    variant: 'default'
  }
}

export const Primary: Story = {
  args: {
    variant: 'primary'
  }
}
