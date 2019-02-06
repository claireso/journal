import { connect } from 'react-redux'
import { navigate } from '@reach/router'

import Login from '../views/Login'

import {
  login,
  LOGIN_SUCCESS,
  loadUser,
  LOAD_USER_SUCCESS
} from '@admin/actions/user'

import { UNAUTHORIZED_ERROR } from '@admin/actions/user'

const mapStateToProps = state => ({
  isLogin: state.user.isLogin
})

const mapDispatchToProps = dispatch => ({
  login(data) {
    dispatch(login(data)).then(action => {
      if (action.type === LOGIN_SUCCESS) {
        dispatch(loadUser()).then(action => {
          if (action.type === LOAD_USER_SUCCESS) {
            const parsedUrl = new URL(window.location.href)
            const next = parsedUrl.searchParams.get('next')

            navigate(next || '/admin/photos')
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
  mapStateToProps,
  mapDispatchToProps
)(Login)
