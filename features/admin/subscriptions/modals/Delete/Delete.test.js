import { render, fireEvent } from '@testing-library/react'

import Delete from './Delete'

import SubscriptionsReducer from '../../reducer'

const { SubscriptionsProvider, INITIAL_STATE } = SubscriptionsReducer

const { useSubscriptionsReducer: originalUseSubscriptionsReducer } =
  SubscriptionsReducer

describe('<Delete />', () => {
  const props = {
    id: 1,
    onClose: jest.fn()
  }

  const renderComponent = () => {
    return render(
      <SubscriptionsProvider value={INITIAL_STATE}>
        <Delete {...props} />
      </SubscriptionsProvider>
    )
  }

  afterEach(() => {
    SubscriptionsReducer.useSubscriptionsReducer =
      originalUseSubscriptionsReducer
  })

  test('should render component', () => {
    const { container } = renderComponent()

    expect(container).toMatchSnapshot()
  })

  test('should close component', () => {
    const { getByText } = renderComponent()

    fireEvent.click(getByText('Cancel'))

    expect(props.onClose).toHaveBeenCalled()
  })

  test('should delete resource', () => {
    const spyDeleteResource = jest.fn()

    SubscriptionsReducer.useSubscriptionsReducer = () => [
      INITIAL_STATE,
      { deleteResource: spyDeleteResource }
    ]

    const { getByText } = renderComponent()

    fireEvent.click(getByText('Yes'))

    expect(spyDeleteResource).toHaveBeenCalledWith(1)
  })

  test('should not delete resource', () => {
    SubscriptionsReducer.useSubscriptionsReducer = () => [
      { status: 'pending' },
      {}
    ]

    const { queryByText } = renderComponent()

    expect(queryByText('Yes')).toBeNull()
  })
})
