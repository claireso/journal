import React from 'react'
import { action } from '@storybook/addon-actions'

import Input from './index'

export default {
  title: 'Form/Input'
}

export const Basic = () => <Input label="Label" name="title" onChange={action('on change')} />
