import React from 'react'

import Select from './index'

const params = {
  title: 'Form/Select'
}

export default params

const options = [
  {
    label: 'Value 1',
    value: '1'
  },
  {
    label: 'Value 2',
    value: '2'
  }
]

export const Basic = () => <Select label="Label" name="position" options={options} />
