import { fireEvent, render, screen } from '@testing-library/react'

import { MessagesProvider } from '../../messages/useMessages'
import ModalDeleteSubscription from './ModalDeleteSubscription'

describe('<ModalDeleteSubscription />', () => {
  const renderComponent = (props) =>
    render(
      <MessagesProvider>
        <ModalDeleteSubscription id={188} {...props} />
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

    fireEvent.click(screen.getByText('Delete'))

    expect(props.onConfirm).toHaveBeenCalledWith(188)
  })
})
