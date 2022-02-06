import React from 'react'
import { action } from '@storybook/addon-actions'

import FlashGroup from './index'

export default {
  title: 'Components/FlashGroup',
  decorators: [(storyFn) => <div style={{ padding: '20px' }}>{storyFn()}</div>]
}

const Template = (args) => <FlashGroup {...args} onClose={action('close message')} />

export const Basic = Template.bind({})
Basic.args = {
  messages: [
    { status: 'default', message: 'Default message' },
    { status: 'success', message: 'Success message' },
    { status: 'error', message: 'Error message' },
    { status: 'info', message: 'Info message' }
  ]
}
