import React, { useReducer, useContext, useCallback } from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'

import { loginUser, getMe, logout } from '@services/api'

const STATUS_IDLE = 'idle'
const STATUS_PENDING = 'pending'

const STATUS_AUTH_SUCCESS = 'auth_success'
const STATUS_AUTH_ERROR = 'auth_error'

const ACTION_UPDATE_STATUS = 'user/update_status'
const ACTION_SET_USER = 'user/set'

export const INITIAL_STATE = {
  status: STATUS_IDLE
}

const UserStateContext = React.createContext()
const UserDispatchContext = React.createContext()

function reducer(state, action) {
  switch (action.type) {
    case ACTION_UPDATE_STATUS:
      return {
        ...state,
        status: action.status
      }
    case ACTION_SET_USER: {
      const user = action.user

      return {
        ...state,
        status: user ? STATUS_AUTH_SUCCESS : STATUS_IDLE,
        user: user
      }
    }
    default:
      return { ...state }
  }
}

export const UserProvider = ({ children, value }) => {
  const [state, dispatch] = useReducer(reducer, value)

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  )
}

UserProvider.propTypes = {
  children: PropTypes.any,
  value: PropTypes.object
}

const useUserState = () => {
  const context = useContext(UserStateContext)

  if (context === undefined) {
    throw new Error('useUserState must be used within a UserProvider')
  }

  return context
}

const useUserDispatch = () => {
  const context = useContext(UserDispatchContext)

  if (context === undefined) {
    throw new Error('useUserDispatch must be used within a UserProvider')
  }

  return context
}

export const useUserReducer = () => {
  const state = useUserState()
  const dispatch = useUserDispatch()

  const actionLogin = useCallback(
    async (data) => {
      dispatch({ type: ACTION_UPDATE_STATUS, status: STATUS_PENDING })

      try {
        await loginUser(data).ready
        const user = await getMe().ready

        dispatch({ type: ACTION_SET_USER, user })

        Router.push('/admin/photos')
      } catch (err) {
        const status = err?.response?.status

        dispatch({ type: ACTION_UPDATE_STATUS, status: STATUS_AUTH_ERROR })

        if ([401, 422].includes(status)) {
          alert('Bad username/password. Please retry')
        }
      }
    },
    [dispatch]
  )

  const actionLogout = useCallback(async () => {
    try {
      await logout().ready
      dispatch({ type: ACTION_SET_USER, undefined })
    } finally {
      Router.push('/admin/login')
    }
  }, [dispatch])

  const actionGetMe = useCallback(async () => {
    dispatch({ type: ACTION_UPDATE_STATUS, status: STATUS_PENDING })

    try {
      const user = await getMe().ready

      dispatch({ type: ACTION_SET_USER, user })
    } catch {
      dispatch({ type: ACTION_UPDATE_STATUS, status: STATUS_AUTH_ERROR })
    }
  }, [dispatch])

  return [
    state,
    { login: actionLogin, logout: actionLogout, getMe: actionGetMe }
  ]
}
