import { render, fireEvent } from '@testing-library/react'
import ColorPicker from './ColorPicker'

describe('<ColorPicker />', () => {
  const props = {
    colors: ['#f00', '#ccc', '#eee'],
    onSelect: jest.fn()
  }

  const renderComponent = (options) => render(<ColorPicker {...props} {...options} />)

  test('should render component', () => {
    const { getByText } = renderComponent()

    expect(getByText('Transparent')).toBeInTheDocument()
    expect(getByText('Color 1')).toBeInTheDocument()
    expect(getByText('Color 2')).toBeInTheDocument()
    expect(getByText('Color 3')).toBeInTheDocument()
  })

  test('should select a color', () => {
    const { getByText } = renderComponent()

    fireEvent.click(getByText('Color 1'))
    expect(props.onSelect).toHaveBeenNthCalledWith(1, '#f00')

    fireEvent.click(getByText('Color 2'))
    expect(props.onSelect).toHaveBeenNthCalledWith(2, '#ccc')

    fireEvent.click(getByText('Color 3'))
    expect(props.onSelect).toHaveBeenNthCalledWith(3, '#eee')
  })

  test('should be rendered with a selected color', () => {
    const { container } = renderComponent({ selected: '#ccc' })

    expect(container.querySelector('input[checked]').id).toEqual('color-1')
  })
})
