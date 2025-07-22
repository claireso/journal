import React, { Fragment } from 'react'
import { action } from 'storybook/actions'

import type { Meta, StoryObj } from '@storybook/react-webpack5'

import Flash from './Flash'

const meta: Meta<typeof Flash> = {
  title: 'Components/Flash',
  component: Flash,
  args: {
    onClose: action('close message')
  },
  render({ status, onClose }) {
    return (
      <Fragment>
        <div>
          <Flash status={status}>Flash message</Flash>
        </div>
        <div>
          <Flash status={status} onClose={onClose}>
            Closable flash message
          </Flash>
        </div>
      </Fragment>
    )
  }
}

export default meta
type Story = StoryObj<typeof Flash>

export const Basic: Story = {
  args: {
    status: 'default'
  }
}

export const Success: Story = {
  args: {
    status: 'success'
  }
}

export const Error: Story = {
  args: {
    status: 'error'
  }
}

export const Info: Story = {
  args: {
    status: 'info'
  }
}
