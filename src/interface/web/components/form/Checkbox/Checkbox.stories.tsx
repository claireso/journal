import React, { Fragment } from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import Checkbox from './Checkbox'

const meta: Meta<typeof Checkbox> = {
  title: 'Form/Checkbox',
  component: Checkbox
}

export default meta
type Story = StoryObj<typeof Checkbox>

export const Basic: Story = {
  render() {
    return (
      <Fragment>
        <Checkbox label="Label" name="portrait" />
        <Checkbox label="Label" name="landscape" value={true} />
      </Fragment>
    )
  }
}
