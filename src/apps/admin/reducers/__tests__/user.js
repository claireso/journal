import * as actionTypes from '../../actions/user'
import userReducer from '../user'

describe('reducer user', () => {
  let reducer

  test('should load user', () => {
    const action = {
      type: actionTypes.LOAD_USER_SUCCESS,
      response: {
        id: 1
      }
    }

    reducer = userReducer(reducer, action)

    expect(reducer).toEqual({
      id: 1,
      isLogin: false
    })
  })

  test('should request log in', () => {
    const action = {
      type: actionTypes.LOGIN_REQUEST,
    }

    reducer = userReducer(reducer, action)

    expect(reducer).toEqual({
      id: 1,
      isLogin: true
    })
  })

  test('should stop log in', () => {
    const action = {
      type: actionTypes.LOGIN_ERROR,
    }

    reducer = userReducer(reducer, action)

    expect(reducer).toEqual({
      id: 1,
      isLogin: false
    })

    reducer = userReducer(reducer, { type: actionTypes.LOGIN_REQUEST })

    reducer = userReducer(reducer, { type: actionTypes.LOGIN_SUCCESS })

    expect(reducer).toEqual({
      id: 1,
      isLogin: false
    })
  })
})