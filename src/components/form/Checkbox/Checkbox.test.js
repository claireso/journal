import { render } from '@testing-library/react'

import Checkbox from './index'

describe('<Checkbox />', () => {
  const props = {
    label: 'Checkbox',
    value: false,
    name: 'checkbox'
  }

  test('should render checkbox', () => {
    const { container } = render(<Checkbox {...props} />)

    expect(container).toMatchSnapshot()
  })

  test('should render checked checkbox', () => {
    const { container } = render(<Checkbox {...props} value={true} />)

    expect(container).toMatchSnapshot()
  })
})
