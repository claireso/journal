import { connect } from 'react-redux'
import { navigate } from '@reach/router'

import Login from '../views/Login'

import {
  login,
  LOGIN_SUCCESS,
  loadUser,
  LOAD_USER_SUCCESS
} from '../../../../common/actions/user'

import { UNAUTHORIZED_ERROR } from '../../../../common/actions/api'

const mapDispatchToProps = dispatch => ({
  login(data) {
    dispatch(login(data)).then(action => {
      if (action.type === LOGIN_SUCCESS) {
        dispatch(loadUser()).then(action => {
          if (action.type === LOAD_USER_SUCCESS) {
            //@TODO: next parameter in url
            navigate('/admin/photos')
          }
        })
      }

      if (action.type === UNAUTHORIZED_ERROR) {
        alert('Bad username/password. Please retry')
      }
    })
  }
})

export default connect(
  null,
  mapDispatchToProps
)(Login)
