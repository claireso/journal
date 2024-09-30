import React from 'react'

import Toolbar from './index'
import Text from '../Text'

const params = {
  title: 'Components/Toolbar'
}

export default params

export const Basic = () => (
  <Toolbar>
    <Text>content</Text>
  </Toolbar>
)
