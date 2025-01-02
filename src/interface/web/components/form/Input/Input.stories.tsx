import type { Meta, StoryObj } from '@storybook/react'

import Input from './Input'

const meta: Meta<typeof Input> = {
  title: 'Form/Input',
  component: Input
}

export default meta
type Story = StoryObj<typeof Input>

export const Basic: Story = {
  args: {
    label: 'Label',
    name: 'title'
  }
}
