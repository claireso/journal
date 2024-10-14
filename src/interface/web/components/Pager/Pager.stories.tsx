// import React from 'react'

// import Pager from './index'

// const params = {
//   title: 'Components/Pager'
// }

// export default params

// export const Basic = () => {
//   const data = {
//     first: 1,
//     last: 8,
//     next: 3,
//     prev: 1
//   }

//   return <Pager {...data} navigate={action('on page change')} />
// }

import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Pager from './Pager'

const meta: Meta<typeof Pager> = {
  title: 'Components/Pager',
  component: Pager
}

export default meta
type Story = StoryObj<typeof Pager>

export const Primary: Story = {
  args: {
    first: 1,
    last: 8,
    next: 3,
    prev: 1,
    navigate: action('on page change')
  }
}
