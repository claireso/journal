import type { Meta, StoryObj } from '@storybook/react-webpack5'

import Loader from './Loader'

const meta: Meta<typeof Loader> = {
  title: 'Components/Loader',
  component: Loader
}

export default meta
type Story = StoryObj<typeof Loader>

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
