import { render, screen, fireEvent } from '@testing-library/react'

import Pager from './index'
import { PagerButton } from '../Buttons'

const renderPager = (props = {}) =>
  render(
    <Pager {...props}>
      {({ items, getItemsProps }) =>
        items.map((item, key) => (
          <li key={key}>
            <PagerButton
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
  it('should not render items', () => {
    const { asFragment } = renderPager({ navigate: () => {} })

    expect(asFragment()).toMatchSnapshot()
  })

  it('should render first page', () => {
    const props = {
      navigate: jest.fn(),
      next: global.__PHOTOS__.pager.next,
      last: global.__PHOTOS__.pager.last
    }

    const { asFragment } = renderPager(props)

    expect(asFragment()).toMatchSnapshot()

    fireEvent.click(screen.getByTitle('Next page'))
    expect(props.navigate).toHaveBeenCalledWith('2')

    fireEvent.click(screen.getByTitle('Last page'))
    expect(props.navigate).toHaveBeenCalledWith('19')
  })

  it('should render second page', () => {
    const props = {
      navigate: jest.fn(),
      first: 1,
      prev: 1,
      next: global.__PHOTOS__.pager.next,
      last: global.__PHOTOS__.pager.last
    }

    const { asFragment } = renderPager(props)

    expect(asFragment()).toMatchSnapshot()

    fireEvent.click(screen.getByTitle('First page'))
    expect(props.navigate).toHaveBeenCalledWith('1')

    fireEvent.click(screen.getByTitle('Previous page'))
    expect(props.navigate).toHaveBeenCalledWith('1')

    fireEvent.click(screen.getByTitle('Next page'))
    expect(props.navigate).toHaveBeenCalledWith('2')

    fireEvent.click(screen.getByTitle('Last page'))
    expect(props.navigate).toHaveBeenCalledWith('19')
  })

  it('should render last page', () => {
    const props = {
      first: 1,
      prev: 1,
      navigate: jest.fn()
    }

    const { asFragment } = renderPager(props)

    expect(asFragment()).toMatchSnapshot()

    fireEvent.click(screen.getByTitle('First page'))
    expect(props.navigate).toHaveBeenCalledWith('1')

    fireEvent.click(screen.getByTitle('Previous page'))
    expect(props.navigate).toHaveBeenCalledWith('1')
  })
})
