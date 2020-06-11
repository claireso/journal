import React from 'react'

import { Tabs, Tab } from './index'

export default {
  title: 'Tabs',
  decorators: [
    (storyFn) => <div style={{ maxWidth: '200px' }}>{storyFn()}</div>
  ]
}

export const Basic = () => (
  <Tabs>
    <Tab isActive>
      <a href="#">Item</a>
    </Tab>
    <Tab>
      <a href="#">Item</a>
    </Tab>
    <Tab>
      <a href="#">Item</a>
    </Tab>
  </Tabs>
)
