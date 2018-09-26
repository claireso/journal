import { connect } from 'react-redux'
import { navigate } from '@reach/router'

import List from '../views/List'

import {
  loadSubscriptions,
  LOAD_SUBSCRIPTIONS_ERROR
} from '@common/actions/subscriptions'

const mapStateToProps = state => ({
  subscriptions: state.subscriptions
})

const mapDispatchToProps = dispatch => ({
  loadSubscriptions(params) {
    dispatch(loadSubscriptions(params)).then(action => {
      if (action.type === LOAD_SUBSCRIPTIONS_ERROR) {
        if (action.status === 404) {
          navigate('/admin/subscriptions')
        }
      }
    })
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List)
