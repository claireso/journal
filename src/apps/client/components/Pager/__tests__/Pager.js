import React from 'react'
import { render, fireEvent } from 'react-testing-library'

import Pager from '../index'

const getPager = (props = {}) => <Pager {...props} />

describe('<Pager />', () => {
  test('should not render items', () => {
    const { container } = render(getPager({ navigate: () => {} }))

    expect(container.querySelector('li')).toBeNull()
  })

  test('should render first page', () => {
    const navigate = jest.fn()
    const { container, getByTitle } = render(
      getPager({
        next: global.__PHOTOS__.pager.next,
        last: global.__PHOTOS__.pager.last,
        navigate: navigate
      })
    )

    expect(container.querySelectorAll('li')).toHaveLength(2)

    expect(getByTitle('Next page')).toBeInTheDocument()
    fireEvent.click(getByTitle('Next page'))
    expect(navigate).toHaveBeenCalledWith(2)

    expect(getByTitle('Last page')).toBeInTheDocument()
    fireEvent.click(getByTitle('Last page'))
    expect(navigate).toHaveBeenCalledWith(19)
  })

  test('should render second page', () => {
    const navigate = jest.fn()
    const { container, getByTitle } = render(
      getPager({
        first: 1,
        prev: 1,
        next: global.__PHOTOS__.pager.next,
        last: global.__PHOTOS__.pager.last,
        navigate: navigate
      })
    )

    expect(container.querySelectorAll('li')).toHaveLength(4)

    expect(getByTitle('First page')).toBeInTheDocument()
    fireEvent.click(getByTitle('First page'))
    expect(navigate).toHaveBeenCalledWith(1)

    expect(getByTitle('Previous page')).toBeInTheDocument()
    fireEvent.click(getByTitle('Previous page'))
    expect(navigate).toHaveBeenCalledWith(1)

    expect(getByTitle('Next page')).toBeInTheDocument()
    fireEvent.click(getByTitle('Next page'))
    expect(navigate).toHaveBeenCalledWith(2)

    expect(getByTitle('Last page')).toBeInTheDocument()
    fireEvent.click(getByTitle('Last page'))
    expect(navigate).toHaveBeenCalledWith(19)
  })

  test('should render last page', () => {
    const navigate = jest.fn()
    const { container, getByTitle } = render(
      getPager({
        first: 1,
        prev: 1,
        navigate: navigate
      })
    )

    expect(container.querySelectorAll('li')).toHaveLength(2)

    expect(getByTitle('First page')).toBeInTheDocument()
    fireEvent.click(getByTitle('First page'))
    expect(navigate).toHaveBeenCalledWith(1)

    expect(getByTitle('Previous page')).toBeInTheDocument()
    fireEvent.click(getByTitle('Previous page'))
    expect(navigate).toHaveBeenCalledWith(1)
  })
})
