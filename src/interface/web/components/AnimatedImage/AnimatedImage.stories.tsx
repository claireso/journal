import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import AnimatedImage from './AnimatedImage'

const meta: Meta<typeof AnimatedImage> = {
  title: 'Components/AnimatedImage',
  component: AnimatedImage,
  render(args) {
    return (
      <div style={{ maxWidth: '500px', display: 'flex', flexDirection: 'column' }}>
        <AnimatedImage {...args} width="100%" />
      </div>
    )
  }
}

export default meta
type Story = StoryObj<typeof AnimatedImage>

export const Basic: Story = {
  args: {
    src: 'https://picsum.photos/id/100/2500/1656.jpg'
  }
}
