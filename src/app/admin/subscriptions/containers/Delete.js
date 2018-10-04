import { connect } from 'react-redux'
import { navigate } from '@reach/router'

import Delete from '../views/Delete'

import {
  deleteSubscription,
  DELETE_SUBSCRIPTION_SUCCESS
} from '@common/actions/subscriptions'
import { displaySuccessMessage } from '@common/actions/messages'

const mapStateToProps = state => ({
  isProcessing: state.subscriptions.isProcessing
})

const mapDispatchToProps = dispatch => ({
  deleteSubscription(id) {
    dispatch(deleteSubscription(Number(id))).then(action => {
      if (action.type === DELETE_SUBSCRIPTION_SUCCESS) {
        navigate('/admin/subscriptions')
        dispatch(
          displaySuccessMessage({
            message: 'Your subscription has been deleted successfully',
            key: 'CRUD_PHOTO'
          })
        )
        return
      }

      // document.querySelector('.modal').scrollTo(0, 0)
    })
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Delete)
