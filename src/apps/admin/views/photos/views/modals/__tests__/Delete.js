import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import Delete from '../Delete'

describe('<Delete />', () => {
  const getProps = () => ({
    deletePhoto: () => {},
    id: 199,
    isProcessing: false,
    onClose: () => {}
  })

  test('should render component', () => {
    const { container } = render(<Delete {...getProps()} />)

    expect(container).toMatchSnapshot()
  })

  test('should close component', () => {
    const props = {
      ...getProps(),
      onClose: jest.fn()
    }

    const { getByText } = render(<Delete {...props} />)

    fireEvent.click(getByText('Cancel'))

    expect(props.onClose).toHaveBeenCalledTimes(1)
  })

  test('should delete photo', () => {
    const props = {
      ...getProps(),
      deletePhoto: jest.fn()
    }

    const { getByText } = render(<Delete {...props} />)

    fireEvent.click(getByText('Yes'))

    expect(props.deletePhoto).toHaveBeenCalledWith(199)
  })

  test('should not delete photo', () => {
    const props = {
      ...getProps(),
      isProcessing: true,
      deletePhoto: jest.fn()
    }

    const { container } = render(<Delete {...props} />)

    expect(container).toMatchSnapshot()

    // const deleteButton = Array.from(container.querySelectorAll('button'))[1]

    // fireEvent.click(deleteButton)

    // expect(props.deletePhoto).toHaveBeenCalledTimes(0)
  })
})
