import React, { Fragment } from 'react'

import { List, ListHeader } from './index'

export default {
  title: 'List'
}

export const Basic = () => (
  <Fragment>
    <ListHeader>
      <div>Header left</div>
      <div>Header right</div>
    </ListHeader>
    <List>
      <li>Item</li>
      <li>Item</li>
      <li>Item</li>
    </List>
  </Fragment>
)
