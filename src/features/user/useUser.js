import React, { useState, useContext, useCallback } from 'react'
import Router from 'next/router'
import PropTypes from 'prop-types'

import * as api from '@services/api'
import logger from '@services/logger'

const UserContext = React.createContext()

const useUserContext = () => {
  const context = useContext(UserContext)

  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider')
  }

  return context
}

export const UserProvider = ({ children }) => {
  const [state, setState] = useState({
    isLoading: true,
    isProcessing: false
  })

  return <UserContext.Provider value={[state, setState]}>{children}</UserContext.Provider>
}

UserProvider.propTypes = {
  children: PropTypes.any
}

const useUser = () => {
  const [state, setState] = useUserContext()

  const updateState = (nextState) => setState({ ...state, ...nextState })

  const getMe = useCallback(async () => {
    try {
      const user = await api.getMe().ready
      updateState({ user, isLoading: false })
    } catch {
      updateState({ isLoading: false })
    }
  }, [])

  const login = useCallback(async (data) => {
    try {
      updateState({ isProcessing: true })
      await api.login(data).ready
      const user = await api.getMe().ready

      updateState({ user, isProcessing: false })

      Router.push('/admin/photos')
    } catch (err) {
      const status = err?.response?.status

      updateState({ isProcessing: false })

      if ([401, 422].includes(status)) {
        alert('Bad username/password. Please retry')
      }
    }
  }, [])

  const logout = useCallback(async () => {
    try {
      await api.logout().ready
      updateState({ user: null })
    } catch (err) {
      logger(err)
    } finally {
      Router.push('/admin/login')
    }
  }, [])

  return [
    state,
    {
      getMe,
      login,
      logout
    }
  ]
}

export default useUser
