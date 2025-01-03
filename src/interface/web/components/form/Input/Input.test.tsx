import { render } from '@testing-library/react'

import Input from './index'

describe('<Input />', () => {
  const renderComponent = (props = {}) => render(<Input label="Title" name="title" value="Titre photo" {...props} />)

  it('should render input', () => {
    const { asFragment } = renderComponent()

    expect(asFragment()).toMatchSnapshot()
  })
})
