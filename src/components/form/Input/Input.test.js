import { render, fireEvent } from '@testing-library/react'

import Input from './index'

describe('<Input />', () => {
  const props = {
    label: 'My input',
    name: 'myinput',
    value: 'my custom value'
  }

  test('should render input', () => {
    const { container } = render(<Input {...props} />)

    expect(container).toMatchSnapshot()
  })

  test('should call onChange property', () => {
    const spyOnChange = jest.fn()

    const { getByLabelText } = render(<Input {...props} onChange={spyOnChange} />)

    const input = getByLabelText('My input')

    fireEvent.change(input, { target: { value: 'My new value' } })

    expect(spyOnChange).toHaveBeenCalledWith('myinput', 'My new value')
  })
})
