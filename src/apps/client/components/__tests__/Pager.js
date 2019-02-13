import React from 'react'
import { render, fireEvent } from 'react-testing-library'

import Pager from '../Pager'
import { Button } from '../Button'

const getPager = (props = {}) => (
  <Pager {...props}>
    {({ items, getItemsProps }) =>
      items.map((item, key) => (
        <li key={key}>
          <Button
            {...getItemsProps({
              label: item.label,
              title: item.title,
              item: item
            })}
          />
        </li>
      ))
    }
  </Pager>
)

describe('<Pager />', () => {
  test('should not render items', () => {
    const { container } = render(getPager())

    expect(container.querySelector('li')).toBeNull()
  })

  test('should render first page', () => {
    const navigate = jest.fn()
    const { container, getByTitle } = render(
      getPager({
        next: __PHOTOS__.pager.next,
        last: __PHOTOS__.pager.last,
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
        next: __PHOTOS__.pager.next,
        last: __PHOTOS__.pager.last,
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
