import React, { Fragment } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import * as Headings from './Headings'

const meta: Meta<typeof Headings> = {
  title: 'Components/Headings'
}

export default meta
type Story = StoryObj<typeof Headings>

const Line = ({ children }: { children: React.ReactNode }) => <div style={{ marginBottom: '16px' }}>{children}</div>

export const Basic: Story = {
  render() {
    return (
      <Fragment>
        <Line>
          <Headings.Heading1>Heading1</Headings.Heading1>
        </Line>
        <Line>
          <Headings.Heading2>Heading2</Headings.Heading2>
        </Line>
        <Line>
          <Headings.Heading3>Heading3</Headings.Heading3>
        </Line>
        <Line>
          <Headings.Heading4>Heading4</Headings.Heading4>
        </Line>
        <Line>
          <Headings.Heading5>Heading5</Headings.Heading5>
        </Line>
        <Line>
          <Headings.Heading6>Heading6</Headings.Heading6>
        </Line>
      </Fragment>
    )
  }
}
