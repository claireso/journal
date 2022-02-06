import React from 'react'
import { action } from '@storybook/addon-actions'

import Pager from './index'

export default {
  title: 'Components/Pager'
}

export const Basic = () => {
  const data = {
    first: 1,
    last: 8,
    next: 3,
    prev: 1
  }

  return <Pager {...data} navigate={action('on page change')} />
}
