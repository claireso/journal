import { render, screen, fireEvent } from '@testing-library/react'

import Input from './index'

describe('<Input />', () => {
  const renderComponent = (props = {}) => render(<Input label="Title" name="title" value="Titre photo" {...props} />)

  it('should render input', () => {
    const { asFragment } = renderComponent()

    expect(asFragment()).toMatchSnapshot()
  })

  it('should call onChange property', () => {
    const props = { onChange: jest.fn() }

    renderComponent(props)

    fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'New title' } })

    expect(props.onChange).toHaveBeenCalledWith('title', 'New title')
  })
})
