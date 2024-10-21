import { render, screen, fireEvent } from '@testing-library/react'
import ColorPicker from './ColorPicker'

describe('<ColorPicker />', () => {
  const props = {
    colors: ['#f00', '#ccc', '#eee'],
    onSelect: jest.fn(),
    disabled: false
  }

  const renderComponent = (options = {}) => render(<ColorPicker {...props} {...options} />)

  it('should render component', () => {
    renderComponent()

    expect(screen.getByText('Transparent')).toBeInTheDocument()
    expect(screen.getByText('Color 0')).toBeInTheDocument()
    expect(screen.getByText('Color 1')).toBeInTheDocument()
    expect(screen.getByText('Color 2')).toBeInTheDocument()
  })

  it('should select a color', () => {
    renderComponent()

    fireEvent.click(screen.getByText('Color 0'))
    expect(props.onSelect).toHaveBeenNthCalledWith(1, '#f00')

    fireEvent.click(screen.getByText('Color 1'))
    expect(props.onSelect).toHaveBeenNthCalledWith(2, '#ccc')

    fireEvent.click(screen.getByText('Color 2'))
    expect(props.onSelect).toHaveBeenNthCalledWith(3, '#eee')
  })

  it('should be rendered with a selected color', () => {
    renderComponent({ selected: '#ccc' })

    expect(screen.getByLabelText('Color 1')).toBeChecked()
  })
})
