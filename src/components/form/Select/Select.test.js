import { render } from '@testing-library/react'

import Select from './index'

describe('<Select />', () => {
  it('should render select', () => {
    const props = {
      label: 'Position',
      name: 'position',
      options: [
        {
          label: 'left',
          value: 'left'
        },
        {
          label: 'right',
          value: 'right'
        }
      ],
      value: 'right'
    }

    const { asFragment } = render(<Select {...props} />)

    expect(asFragment()).toMatchSnapshot()
  })
})
