import type { Meta, StoryObj } from '@storybook/react-webpack5'

import Select from './Select'

const meta: Meta<typeof Select> = {
  title: 'Form/Select',
  component: Select
}

export default meta
type Story = StoryObj<typeof Select>

export const Basic: Story = {
  args: {
    label: 'Label',
    name: 'position',
    options: [
      {
        label: 'Value 1',
        value: '1'
      },
      {
        label: 'Value 2',
        value: '2'
      }
    ]
  }
}
