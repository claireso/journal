import { connect } from 'react-redux'
import { navigate } from '@reach/router'

import Delete from '../views/Delete'

import { deleteSubscription, DELETE_SUBSCRIPTION_SUCCESS } from '../../../../common/actions/subscriptions'

const mapStateToProps = (state) => ({
  // error: state.photos.error,
})

const mapDispatchToProps = (dispatch) => ({
  deleteSubscription(id) {
    dispatch(deleteSubscription(Number(id)))
    .then(action => {
      if (action.type === DELETE_SUBSCRIPTION_SUCCESS) {
        navigate('/admin/subscriptions')
        return
      }

      document.querySelector('.modal').scrollTo(0,0)
    })
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Delete)
