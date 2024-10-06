import { render } from '@testing-library/react'

import { ButtonPrimary } from './index'

describe('<ButtonPrimary />', () => {
  it('should render loader', () => {
    const { asFragment } = render(<ButtonPrimary isLoading>Button</ButtonPrimary>)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should render button', () => {
    const { asFragment } = render(<ButtonPrimary>Button</ButtonPrimary>)

    expect(asFragment()).toMatchSnapshot()
  })
})
