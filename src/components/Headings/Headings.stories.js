import React, { Fragment } from 'react'

import * as Headings from './index'

const params = {
  title: 'Components/Headings'
}

export default params

export const Basic = () => (
  <Fragment>
    <Headings.Heading1>Heading1</Headings.Heading1>
    <Headings.Heading2>Heading2</Headings.Heading2>
    <Headings.Heading3>Heading3</Headings.Heading3>
    <Headings.Heading4>Heading4</Headings.Heading4>
    <Headings.Heading5>Heading5</Headings.Heading5>
    <Headings.Heading6>Heading6</Headings.Heading6>
  </Fragment>
)
