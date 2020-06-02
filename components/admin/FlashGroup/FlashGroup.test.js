import { render, fireEvent } from '@testing-library/react'

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

  test('should render two flash messages', () => {
    const { container } = render(
      <FlashGroup messages={messages} onClose={() => {}} />
    )

    expect(container).toMatchSnapshot()
  })

  test('should close flash messages', () => {
    const spyOnClose = jest.fn()
    const { container } = render(
      <FlashGroup messages={messages} onClose={spyOnClose} />
    )

    expect(container).toMatchSnapshot()

    const closeButtons = Array.from(container.querySelectorAll('button'))

    fireEvent.click(closeButtons[0])

    expect(spyOnClose).toHaveBeenNthCalledWith(1, 0)

    fireEvent.click(closeButtons[1])
    expect(spyOnClose).toHaveBeenNthCalledWith(2, 1)
  })
})
