import { render, screen, fireEvent, waitFor } from '@testing-library/react'

import Modal from './index'

describe('<Modal />', () => {
  const renderComponent = (props = {}, options = {}) =>
    render(
      <Modal title="Modal title" onClose={jest.fn()} {...props}>
        <div>content</div>
      </Modal>,
      options
    )

  it('should render component', () => {
    const { asFragment } = renderComponent({ isOpen: true, onClose: () => {} })

    expect(asFragment()).toMatchSnapshot()
  })

  it('should close component by click (button close)', async () => {
    const props = { isOpen: true, onClose: jest.fn() }

    renderComponent(props)

    fireEvent.click(screen.getByRole('button'))

    await waitFor(() => expect(props.onClose).toHaveBeenCalledTimes(1))
  })

  it('should close modal by click (background layer)', async () => {
    const props = { isOpen: true, onClose: jest.fn(), testId: 'modal' }

    renderComponent(props)

    fireEvent.click(screen.getByTestId(props.testId))

    await waitFor(() => expect(props.onClose).toHaveBeenCalledTimes(1))
  })

  it('should close component by keyboard', async () => {
    const props = { isOpen: true, onClose: jest.fn() }

    renderComponent(props)

    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape', charCode: 27 })

    await waitFor(() => expect(props.onClose).toHaveBeenCalledTimes(1))
  })
})
