import React, { Fragment } from 'react'

import Checkbox from './index'

const params = {
  title: 'Form/Checkbox'
}

export default params

export const Basic = () => (
  <Fragment>
    <Checkbox label="Label" name="portrait" />
    <Checkbox label="Label" name="landscape" value={true} />
  </Fragment>
)
