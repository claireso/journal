import PropTypes from 'prop-types'

import compose from '@utils/compose'

import withLayoutAdmin from '@features/admin/hoc/withLayoutAdmin'
import withModalEdition from '@features/admin/hoc/withModalEdition'

import ListSubscriptions from '@features/admin/subscriptions/Subscriptions'
import ModalDeleteSubscription from '@features/admin/subscriptions/modals/Delete'

import {
  SubscriptionsProvider,
  INITIAL_STATE,
  ACTION_TYPES
} from '@features/admin/subscriptions/reducer'

const Subscriptions = (props) => {
  return (
    <SubscriptionsProvider value={INITIAL_STATE}>
      <ListSubscriptions />
      {props.modal}
    </SubscriptionsProvider>
  )
}

Subscriptions.propTypes = {
  modal: PropTypes.element
}

const getModalChildComponent = (id, action) => {
  let component

  switch (action) {
    case ACTION_TYPES.DELETE: {
      if (!id) return null
      component = <ModalDeleteSubscription id={id} />
      break
    }
  }

  return component
}

export default compose(
  withLayoutAdmin,
  withModalEdition(getModalChildComponent)
)(Subscriptions)
