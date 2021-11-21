import React, { Fragment } from 'react'

import * as Icons from './index'

export default {
  title: 'Icons',
  decorators: [(storyFn) => <div style={{ display: 'flex', flexDirection: 'column' }}>{storyFn()}</div>]
}

export const Basic = () => (
  <Fragment>
    <div style={{ margin: '0 0 10px' }}>
      <Icons.IconPlus />
    </div>
    <div style={{ margin: '0 0 10px' }}>
      <Icons.IconBack />
    </div>
    <div style={{ margin: '0 0 10px' }}>
      <Icons.IconUpload />
    </div>
    <div style={{ margin: '0 0 10px' }}>
      <Icons.IconClose />
    </div>
    <div style={{ margin: '0 0 10px' }}>
      <Icons.IconAngleRight />
    </div>
    <div style={{ margin: '0 0 10px' }}>
      <Icons.IconPencil />
    </div>
    <div style={{ margin: '0 0 10px' }}>
      <Icons.IconDelete />
    </div>
  </Fragment>
)

export const Bigger = () => (
  <Fragment>
    <div style={{ margin: '0 0 10px' }}>
      <Icons.IconPlus width="30" height="30" />
    </div>
    <div style={{ margin: '0 0 10px' }}>
      <Icons.IconBack width="30" height="30" />
    </div>
    <div style={{ margin: '0 0 10px' }}>
      <Icons.IconUpload width="30" height="30" />
    </div>
    <div style={{ margin: '0 0 10px' }}>
      <Icons.IconClose width="30" height="30" />
    </div>
    <div style={{ margin: '0 0 10px' }}>
      <Icons.IconAngleRight width="30" height="30" />
    </div>
    <div style={{ margin: '0 0 10px' }}>
      <Icons.IconPencil width="30" height="30" />
    </div>
    <div style={{ margin: '0 0 10px' }}>
      <Icons.IconDelete width="30" height="30" />
    </div>
  </Fragment>
)

Bigger.story = {
  parameters: {
    notes: 'To customize the size of an icon, add the props `width` and `height` to the component'
  }
}
