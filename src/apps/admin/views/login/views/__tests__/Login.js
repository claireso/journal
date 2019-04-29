import React from 'react'
import { render, fireEvent } from 'react-testing-library'

import Login from '../Login'

describe('<Login />', () => {
  test('should render component', () => {
    const { container } = render(<Login login={() => {}} />)

    expect(container).toMatchSnapshot()
  })

  test('should render component in processing status', () => {
    const { container } = render(<Login login={() => {}} isLogin />)

    expect(container).toMatchSnapshot()
  })

  test('should call login function', () => {
    const spyOnSubmit = jest.fn()

    const { getByLabelText, getByDisplayValue } = render(
      <Login login={spyOnSubmit} />
    )

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
