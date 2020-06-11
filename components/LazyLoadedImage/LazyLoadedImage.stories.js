import React from 'react'
import LazyLoadedImage from './index'

export default {
  title: 'LazyLoadedImage',
  decorators: [
    (storyFn) => (
      <div
        style={{ maxWidth: '500px', display: 'flex', flexDirection: 'column' }}
      >
        {storyFn()}
      </div>
    )
  ]
}

export const Basic = () => (
  <LazyLoadedImage
    src={'https://i.picsum.photos/id/100/2500/1656.jpg'}
    width="100%"
  />
)
