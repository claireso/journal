import { render, screen, fireEvent } from '@testing-library/react'

import LoginForm from './LoginForm'

describe('<FormLogin />', () => {
  const defaultProps = {
    onSubmit: () => {},
    isProcessing: false
  }

  const renderComponent = (props = {}) => {
    return render(<LoginForm {...defaultProps} {...props} />)
  }

  it('should render component', () => {
    const { asFragment } = renderComponent()

    expect(asFragment()).toMatchSnapshot()
  })

  it('should render component in processing status', () => {
    const { asFragment } = renderComponent({ isProcessing: true })

    expect(asFragment()).toMatchSnapshot()
  })

  it('should call onSubmit function', () => {
    const props = {
      onSubmit: jest.fn()
    }

    renderComponent(props)

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: 'admin' }
    })

    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password' }
    })

    fireEvent.click(screen.getByDisplayValue(/log in/i))

    expect(props.onSubmit).toHaveBeenCalledWith({
      username: 'admin',
      password: 'password'
    })
  })
})
