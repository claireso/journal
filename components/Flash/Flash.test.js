import { render, fireEvent } from '@testing-library/react'

import Flash from './index'

describe('<Flash />', () => {
  test('should render default flash message', () => {
    const { container } = render(<Flash>Flash message</Flash>)

    expect(container).toMatchSnapshot()
  })

  test('should render success flash message', () => {
    const { container } = render(<Flash status="success">Flash message</Flash>)

    expect(container).toMatchSnapshot()
  })

  test('should render error flash message', () => {
    const { container } = render(<Flash status="error">Flash message</Flash>)

    expect(container).toMatchSnapshot()
  })

  test('should close flash message', () => {
    const spyOnClose = jest.fn()

    const { container } = render(
      <Flash onClose={spyOnClose}>Flash message</Flash>
    )

    expect(container).toMatchSnapshot()

    const closeButton = container.querySelector('button')

    fireEvent.click(closeButton)

    expect(spyOnClose).toHaveBeenCalledTimes(1)
  })
})
