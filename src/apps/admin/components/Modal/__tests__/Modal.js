import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import Modal from '../index'

describe('<Modal />', () => {
  const TRANSITION_SPEED = 500

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

  test('should close component by click (button close)', done => {
    const props = { isOpen: true, onClose: jest.fn() }
    const { container } = renderComponent(props)

    fireEvent.click(container.querySelector('button'))

    setTimeout(() => {
      expect(props.onClose).toHaveBeenCalledTimes(1)
      expect(container).toMatchSnapshot()
      done()
    }, TRANSITION_SPEED)
  })

  test('should close component by click (background layer)', done => {
    const props = { isOpen: true, onClose: jest.fn() }
    const { container } = renderComponent(props)

    fireEvent.click(container.querySelector('div'))

    setTimeout(() => {
      expect(props.onClose).toHaveBeenCalledTimes(1)
      expect(container).toMatchSnapshot()
      done()
    }, TRANSITION_SPEED)
  })

  test('should close component by keyboard', done => {
    const props = { isOpen: true, onClose: jest.fn() }
    const { container } = renderComponent(props)

    fireEvent(
      document,
      new KeyboardEvent('keydown', {
        key: 'Escape',
        keyCode: 27,
        which: 27,
        bubbles: true
      })
    )

    setTimeout(() => {
      expect(props.onClose).toHaveBeenCalledTimes(1)
      expect(container).toMatchSnapshot()
      done()
    }, TRANSITION_SPEED)
  })

  test('should close component by prop update', done => {
    const props = { isOpen: true, onClose: jest.fn() }
    const { container } = renderComponent(props)

    expect(container).toMatchSnapshot()

    renderComponent({ isOpen: false }, { container })

    setTimeout(() => {
      expect(container).toMatchSnapshot()
      done()
    }, TRANSITION_SPEED)
  })
})
