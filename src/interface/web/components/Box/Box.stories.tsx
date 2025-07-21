import type { Meta, StoryObj } from '@storybook/react-webpack5'

import Box from './Box'

const meta: Meta<typeof Box> = {
  title: 'Components/Box',
  component: Box
}

export default meta
type Story = StoryObj<typeof Box>

export const Primary: Story = {
  args: {
    children: `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sodales lorem a elit gravida, a elementum
    mauris ullamcorper. Vivamus nisi est, ultrices ut tempor ut, consectetur quis dui. Aenean vestibulum nibh nec
    lobortis molestie.
    `
  }
}
