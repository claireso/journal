import React from 'react'
import { render, fireEvent } from 'react-testing-library'

import Flash from '../Flash'

describe('<Flash />', () => {
  test('should render default flash message', () => {
    const flash = { message: 'Flash message' }

    const { container } = render(<Flash {...flash} />)

    expect(container).toMatchSnapshot()
  })

  test('should render success flash message', () => {
    const flash = { status: 'success', message: 'Flash message' }

    const { container } = render(<Flash {...flash} />)

    expect(container).toMatchSnapshot()
  })

  test('should render error flash message', () => {
    const flash = { status: 'error', message: 'Flash message' }

    const { container } = render(<Flash {...flash} />)

    expect(container).toMatchSnapshot()
  })

  test('should close flash message', () => {
    const flash = { message: 'Flash message' }
    const spyOnClose = jest.fn()

    const { container } = render(<Flash {...flash} onClose={spyOnClose} />)

    expect(container).toMatchSnapshot()

    const closeButton = container.querySelector('button')

    fireEvent.click(closeButton)

    expect(spyOnClose).toHaveBeenCalledTimes(1)
  })
})
