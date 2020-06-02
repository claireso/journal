import { render, fireEvent } from '@testing-library/react'

import FormLogin from './Form'

describe('<FormLogin />', () => {
  const defaultProps = {
    onSubmit: () => {},
    isProcessing: false
  }

  const renderComponent = (props = {}) => {
    return render(<FormLogin {...defaultProps} {...props} />)
  }

  test('should render component', () => {
    const { container } = renderComponent()

    expect(container).toMatchSnapshot()
  })

  test('should render component in processing status', () => {
    const { container } = renderComponent({ isProcessing: true })

    expect(container).toMatchSnapshot()
  })

  test('should call onSubmit function', () => {
    const spyOnSubmit = jest.fn()

    const { getByLabelText, getByDisplayValue } = renderComponent({
      onSubmit: spyOnSubmit
    })

    fireEvent.change(getByLabelText(/username/i), {
      target: { value: 'admin' }
    })
    fireEvent.change(getByLabelText(/password/i), {
      target: { value: 'password' }
    })

    fireEvent.click(getByDisplayValue(/log in/i))

    expect(spyOnSubmit).toHaveBeenCalledWith({
      username: 'admin',
      password: 'password'
    })
  })
})
