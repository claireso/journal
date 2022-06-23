import React from 'react'

import { Tabs, Tab } from './index'

const params = {
  title: 'Components/Tabs',
  decorators: [(storyFn) => <div style={{ maxWidth: '200px' }}>{storyFn()}</div>]
}

export default params

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
