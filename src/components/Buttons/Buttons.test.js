import { render } from '@testing-library/react'

import { PrimaryButton } from './index'

describe('<PrimaryButton />', () => {
  it('should render loader', () => {
    const { asFragment } = render(<PrimaryButton isLoading>Button</PrimaryButton>)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should render button', () => {
    const { asFragment } = render(<PrimaryButton>Button</PrimaryButton>)

    expect(asFragment()).toMatchSnapshot()
  })
})
