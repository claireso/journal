import React from 'react'
import { action } from '@storybook/addon-actions'

import FlashGroup from './index'

export default {
  title: 'FlashGroup',
  decorators: [(storyFn) => <div style={{ padding: '20px' }}>{storyFn()}</div>]
}

export const Basic = () => {
  const messages = [
    { status: 'default', message: 'Default message' },
    { status: 'success', message: 'Success message' },
    { status: 'error', message: 'Error message' },
    { status: 'info', message: 'Info message' }
  ]

  return <FlashGroup messages={messages} onClose={action('close message')} />
}
