import React from 'react'
import { render, fireEvent } from 'react-testing-library'

import Flash from '../Flash'

describe('<Flash />', () => {
  test('should not render close button', () => {
    const { container } = render(
      <Flash>
        <p>Flash message</p>
      </Flash>
    )

    expect(container).toMatchSnapshot()
  })

  test('should render close button and call props onClose', () => {
    const mockOnClose = jest.fn()

    const { container } = render(
      <Flash status="success" onClose={mockOnClose}>
        <p>Flash message</p>
      </Flash>
    )

    expect(container).toMatchSnapshot()

    const buttonClose = container.querySelector('button')

    fireEvent.click(buttonClose)

    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })
})
