import type { Meta, StoryObj } from '@storybook/react-webpack5'

import Text from './Text'

const meta: Meta<typeof Text> = {
  title: 'Components/Text',
  component: Text
}

export default meta
type Story = StoryObj<typeof Text>

export const Base: Story = {
  args: {
    children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    as: 'p',
    size: 'base',
    color: 'base',
    italic: false,
    weight: 'normal'
  }
}
