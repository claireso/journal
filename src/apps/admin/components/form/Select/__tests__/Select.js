import React from 'react'
import { render } from '@testing-library/react'

import Select from '../index'

describe('<Select />', () => {
  test('should render select', () => {
    const props = {
      label: 'My select',
      name: 'myselect',
      options: [
        {
          label: 'option 1',
          value: 'option1'
        },
        {
          label: 'option 2',
          value: 'option2'
        }
      ],
      value: 'option2'
    }

    const { container } = render(<Select {...props} />)

    expect(container).toMatchSnapshot()
  })
})
