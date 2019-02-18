import React from 'react'
import { render } from 'react-testing-library'

import { PrimaryButton } from '../Buttons'

describe('<PrimaryButton />', () => {
  test('should render loader', () => {
    const { container } = render(<PrimaryButton isLoading>Button</PrimaryButton>)

    expect(container).toMatchSnapshot()
  })

  test('should render button', () => {
    const { container } = render(<PrimaryButton>Button</PrimaryButton>)

    expect(container).toMatchSnapshot()
  })
})