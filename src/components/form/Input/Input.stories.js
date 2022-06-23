import React from 'react'
import { action } from '@storybook/addon-actions'

import Input from './index'

const params = {
  title: 'Form/Input'
}

export default params

export const Basic = () => <Input label="Label" name="title" onChange={action('on change')} />
