import React from 'react'
import AnimatedImage from './index'

export default {
  title: 'AnimatedImage',
  decorators: [
    (storyFn) => <div style={{ maxWidth: '500px', display: 'flex', flexDirection: 'column' }}>{storyFn()}</div>
  ]
}

export const Basic = () => <AnimatedImage src={'https://picsum.photos/id/100/2500/1656.jpg'} width="100%" />
