import React from 'react'
import { render, fireEvent } from 'react-testing-library'

import Edit from '../Edit'

describe('<Edit />', () => {

  const getProps = () => ({
    editPhoto: () => { },
    loadPhoto: () => { },
    photo: __PHOTO__,
    isProcessing: false,
    onClose: () => { },
    id: 199
  })

  test('should render component', () => {
    const { container } = render(<Edit {...getProps()} />)

    expect(container).toMatchSnapshot()
  })

  test('should load photo', () => {
    const props = {
      ...getProps(),
      loadPhoto: jest.fn(),
      photo: undefined
    }

    const { container } = render(<Edit {...props} />)

    expect(container).toMatchSnapshot()
    expect(props.loadPhoto).toHaveBeenCalledWith(199)
  })

  test('should render error', () => {
    const props = {
      ...getProps(),
      error: {
        status: 'error',
        message: 'Error message'
      }
    }

    const { container } = render(<Edit {...props} />)

    expect(container).toMatchSnapshot()
  })
})