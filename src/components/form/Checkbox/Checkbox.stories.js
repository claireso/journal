import React, { Fragment } from 'react'

import Checkbox from './index'

export default {
  title: 'Form/Checkbox'
}

export const Basic = () => (
  <Fragment>
    <Checkbox label="Label" name="portrait" />
    <Checkbox label="Label" name="landscape" value={true} />
  </Fragment>
)
