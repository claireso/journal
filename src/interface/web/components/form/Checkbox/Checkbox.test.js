import { render } from '@testing-library/react'

import Checkbox from './index'

describe('<Checkbox />', () => {
  const renderComponent = (props = {}) => render(<Checkbox label="Checkbox" name="checkbox" value={false} {...props} />)

  it('should render checkbox', () => {
    const { asFragment } = renderComponent()

    expect(asFragment()).toMatchSnapshot()
  })

  it('should render checked checkbox', () => {
    const { asFragment } = renderComponent({ value: true })

    expect(asFragment()).toMatchSnapshot()
  })
})
