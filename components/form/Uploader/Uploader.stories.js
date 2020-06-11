import React from 'react'
import { action } from '@storybook/addon-actions'

import Uploader from './index'

export default {
  title: 'Form/Uploader',
  decorators: [
    (storyFn) => <div style={{ maxWidth: '500px' }}>{storyFn()}</div>
  ]
}

export const Basic = () => (
  <Uploader
    name="media"
    accept={['image/jpeg', 'image/png']}
    onChange={action('onChange')}
  />
)
