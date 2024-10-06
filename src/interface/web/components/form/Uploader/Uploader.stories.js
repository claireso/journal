import React from 'react'
import { action } from '@storybook/addon-actions'

import Uploader from './index'

const params = {
  title: 'Form/Uploader',
  decorators: [(storyFn) => <div style={{ maxWidth: '500px' }}>{storyFn()}</div>],
  argTypes: { processing: { control: 'boolean' } },
  args: {
    processing: false
  }
}

export default params

export const Basic = (args) => (
  <Uploader
    name="media"
    accept={['image/jpeg', 'image/png']}
    onChange={action('onChange')}
    processing={args.processing}
  />
)
