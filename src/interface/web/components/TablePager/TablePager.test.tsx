import { render, screen } from '@testing-library/react'

import TablePager from './TablePager'
import type { TablePagerProps } from './TablePager'

describe('<TablePager />', () => {
  function renderComponent(props: TablePagerProps) {
    return render(<TablePager {...props} />)
  }

  it('should render the first page', () => {
    const { getByText } = renderComponent({ count: 200, limit: 10, totalPages: 20, offset: 0 })

    expect(getByText('1-10 of 200')).toBeInTheDocument()
  })

  it('should render the second page', () => {
    const { getByText } = renderComponent({ count: 200, limit: 10, totalPages: 20, offset: 1 })

    expect(getByText('11-20 of 200')).toBeInTheDocument()
  })

  it('should render the last page', () => {
    const { getByText } = renderComponent({ count: 200, limit: 10, totalPages: 20, offset: 19 })

    expect(getByText('191-200 of 200')).toBeInTheDocument()
  })

  it('should render the unique page (count < limit)', () => {
    const { getByText } = renderComponent({ count: 6, limit: 10, totalPages: 1, offset: 0 })

    expect(getByText('1-6 of 6')).toBeInTheDocument()
  })

  it('should render no page', () => {
    const { getByText } = renderComponent({ count: 0, limit: 10, totalPages: 0, offset: 0 })

    expect(getByText('0-0 of 0')).toBeInTheDocument()
  })
})
