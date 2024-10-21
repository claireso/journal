import type { Meta, StoryObj } from '@storybook/react'

import Link from './Link'

const meta: Meta<typeof Link> = {
  title: 'Components/Link',
  component: Link,
  args: {
    href: '#'
  }
}

export default meta
type Story = StoryObj<typeof Link>

export const Basic: Story = {
  args: {
    children: 'Link',
    variant: 'default'
  }
}

export const Primary: Story = {
  args: {
    children: 'LinkPrimary',
    variant: 'primary'
  }
}
