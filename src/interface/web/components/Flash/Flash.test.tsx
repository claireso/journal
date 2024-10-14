import { render, screen, fireEvent } from '@testing-library/react'

import Flash from './index'

describe('<Flash />', () => {
  it('should render default message', () => {
    const { asFragment } = render(<Flash>Flash message</Flash>)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should render success message', () => {
    const { asFragment } = render(<Flash status="success">Flash message</Flash>)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should render error message', () => {
    const { asFragment } = render(<Flash status="error">Flash message</Flash>)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should close message', () => {
    const onClose = jest.fn()

    const { asFragment } = render(<Flash onClose={onClose}>Flash message</Flash>)

    expect(asFragment()).toMatchSnapshot()

    fireEvent.click(screen.getByRole('button'))

    expect(onClose).toHaveBeenCalledTimes(1)
  })
})
