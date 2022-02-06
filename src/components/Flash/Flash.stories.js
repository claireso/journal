import React, { Fragment } from 'react'
import { action } from '@storybook/addon-actions'

import Flash from './index'

export default {
  title: 'Components/Flash'
}

const Template = (args) => (
  <Fragment>
    <div>
      <Flash status={args.status}>Flash message</Flash>
    </div>
    <div>
      <Flash status={args.status} onClose={action('close message')}>
        Closable flash message
      </Flash>
    </div>
  </Fragment>
)

export const Basic = Template.bind({})
Basic.args = {}

export const Success = Template.bind({})
Success.args = { status: 'success' }

export const Error = Template.bind({})
Error.args = { status: 'error' }

export const Info = Template.bind({})
Info.args = { status: 'info' }
