import type { Meta, StoryObj } from '@storybook/react-webpack5'
import { action } from 'storybook/actions'

import Pager from './Pager'

const meta: Meta<typeof Pager> = {
  title: 'Components/Pager',
  component: Pager
}

export default meta
type Story = StoryObj<typeof Pager>

export const Primary: Story = {
  args: {
    first: 1,
    last: 8,
    next: 3,
    prev: 1,
    navigate: action('on page change')
  }
}
