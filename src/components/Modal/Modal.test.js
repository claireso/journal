import { render, fireEvent, waitFor } from '@testing-library/react'

import Modal from './index'

describe('<Modal />', () => {
  const renderComponent = (props = {}, options = {}) =>
    render(
      <Modal {...props}>
        <div>content</div>
      </Modal>,
      options
    )

  test('should render component', () => {
    const { container } = renderComponent({ isOpen: true, onClose: () => {} })

    expect(container).toMatchSnapshot()
  })

  test('should close component by click (button close)', async () => {
    const props = { isOpen: true, onClose: jest.fn() }
    const { container } = renderComponent(props)

    fireEvent.click(container.querySelector('button'))

    await waitFor(() => expect(props.onClose).toHaveBeenCalledTimes(1))
  })

  test('should close component by click (background layer)', async () => {
    const props = { isOpen: true, onClose: jest.fn() }
    const { container } = renderComponent(props)

    fireEvent.click(container.querySelector('div'))

    await waitFor(() => expect(props.onClose).toHaveBeenCalledTimes(1))
  })

  test('should close component by keyboard', async () => {
    const props = { isOpen: true, onClose: jest.fn() }
    renderComponent(props)

    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape', charCode: 27 })

    await waitFor(() => expect(props.onClose).toHaveBeenCalledTimes(1))
  })
})
