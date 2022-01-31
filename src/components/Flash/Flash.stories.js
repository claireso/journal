import React, { Fragment } from 'react'
import { action } from '@storybook/addon-actions'

import Flash from './index'

export default {
  title: 'Flash'
}

export const Basic = () => (
  <Fragment>
    <div>
      <Flash>Flash message</Flash>
    </div>
    <div>
      <Flash onClose={action('close message')}>Closable flash message</Flash>
    </div>
  </Fragment>
)

export const Success = () => (
  <Fragment>
    <div>
      <Flash status="success">Flash message</Flash>
    </div>
    <div>
      <Flash status="success" onClose={action('close message')}>
        Closable flash message
      </Flash>
    </div>
  </Fragment>
)

export const Error = () => (
  <Fragment>
    <div>
      <Flash status="error">Flash message</Flash>
    </div>
    <div>
      <Flash status="error" onClose={action('close message')}>
        Closable flash message
      </Flash>
    </div>
  </Fragment>
)

export const Info = () => (
  <Fragment>
    <div>
      <Flash status="info">Flash message</Flash>
    </div>
    <div>
      <Flash status="info" onClose={action('close message')}>
        Closable flash message
      </Flash>
    </div>
  </Fragment>
)
