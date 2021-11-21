import React, { Fragment } from 'react'

import * as Headings from './index'

export default {
  title: 'Headings'
}

export const Basic = () => (
  <Fragment>
    <Headings.Heading1>Heading1</Headings.Heading1>
    <Headings.Heading1XL>Heading1XL</Headings.Heading1XL>
    <Headings.Heading2>Heading2</Headings.Heading2>
  </Fragment>
)
