import React, { Fragment } from 'react'

import { List, ListHeader } from './index'
import { ButtonPrimary } from '../Buttons'

const params = {
  title: 'Components/List'
}

export default params

export const Basic = () => (
  <Fragment>
    <ListHeader>
      <h1>List header</h1>
      <div>
        <ButtonPrimary>Edit photo</ButtonPrimary>
      </div>
    </ListHeader>
    <List>
      <li>Item</li>
      <li>Item</li>
      <li>Item</li>
    </List>
  </Fragment>
)
