import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import { SubscriptionsProvider } from '../useSubscriptions'
import { MessagesProvider } from '../../messages/useMessages'
import ModalDeleteSubscription from './ModalDeleteSubscription'

import * as api from '@services/api'

describe('<ModalDeleteSubscription />', () => {
  const renderComponent = (props) =>
    render(
      <MessagesProvider>
        <SubscriptionsProvider>
          <ModalDeleteSubscription id={188} {...props} />
        </SubscriptionsProvider>
      </MessagesProvider>
    )

  beforeEach(() => {
    jest.spyOn(api, 'deleteSubscription')
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render component', () => {
    const { asFragment } = renderComponent()

    expect(asFragment()).toMatchSnapshot()
  })

  it('should not delete subscription', () => {
    const props = {
      onClose: jest.fn()
    }

    renderComponent(props)

    fireEvent.click(screen.getByText('Cancel'))

    expect(props.onClose).toHaveBeenCalled()
    expect(api.deleteSubscription).not.toHaveBeenCalled()
  })

  it('should delete subscription', async () => {
    const props = {
      onClose: jest.fn()
    }

    renderComponent(props)

    fireEvent.click(screen.getByText('Yes'))

    expect(api.deleteSubscription).toHaveBeenCalledWith(188)

    await waitFor(() => expect(props.onClose).toHaveBeenCalled())
  })
})
