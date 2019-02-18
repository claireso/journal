import React from 'react'
import { render } from 'react-testing-library'

import Button from '../Button'

describe('<Button />', () => {
  test('should render button', () => {
    const { container } = render(<Button value="Submit" />)

    expect(container).toMatchSnapshot()
  })

  test('should render loader', () => {
    const { container } = render(<Button value="Submit" isLoading />)

    expect(container).toMatchSnapshot()
  })
})