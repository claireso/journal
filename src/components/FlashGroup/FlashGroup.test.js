import { render, screen, fireEvent } from '@testing-library/react'

import FlashGroup from './index'

describe('<FlashGroup />', () => {
  const messages = [
    {
      status: 'success',
      message: 'Success message'
    },
    {
      status: 'error',
      message: 'Error message'
    }
  ]

  it('should render two messages', () => {
    const { asFragment } = render(<FlashGroup messages={messages} onClose={() => {}} />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should close messages', () => {
    const onClose = jest.fn()

    const { asFragment } = render(<FlashGroup messages={messages} onClose={onClose} />)

    expect(asFragment()).toMatchSnapshot()

    const buttons = screen.getAllByRole('button')

    fireEvent.click(buttons[0])

    expect(onClose).toHaveBeenNthCalledWith(1, 0)

    fireEvent.click(buttons[1])

    expect(onClose).toHaveBeenNthCalledWith(2, 1)
  })
})
