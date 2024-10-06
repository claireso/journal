import React from 'react'
import AnimatedImage from './index'

const params = {
  title: 'Components/AnimatedImage',
  decorators: [
    (storyFn) => <div style={{ maxWidth: '500px', display: 'flex', flexDirection: 'column' }}>{storyFn()}</div>
  ]
}

export default params

const Template = (args) => <AnimatedImage {...args} width="100%" />

export const Basic = Template.bind({})

Basic.args = {
  src: 'https://picsum.photos/id/100/2500/1656.jpg'
}
