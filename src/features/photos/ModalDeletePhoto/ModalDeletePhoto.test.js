import { fireEvent, render, screen } from '@testing-library/react'

import { MessagesProvider } from '../../messages/useMessages'
import ModalDeletePhoto from './ModalDeletePhoto'

describe('<ModalDeletePhoto />', () => {
  const renderComponent = (props) =>
    render(
      <MessagesProvider>
        <ModalDeletePhoto id={188} {...props} />
      </MessagesProvider>
    )

  it('should render component', () => {
    const { asFragment } = renderComponent()

    expect(asFragment()).toMatchSnapshot()
  })

  it('should not delete subscription', () => {
    const props = {
      onCancel: jest.fn()
    }

    renderComponent(props)

    fireEvent.click(screen.getByText('Cancel'))

    expect(props.onCancel).toHaveBeenCalled()
  })

  it('should delete subscription', async () => {
    const props = {
      onConfirm: jest.fn()
    }

    renderComponent(props)

    fireEvent.click(screen.getByText('Yes'))

    expect(props.onConfirm).toHaveBeenCalledWith(188)
  })
})
