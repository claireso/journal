import React, { useState, useContext, useCallback } from 'react'
import Router from 'next/router'

import * as api from '@services/api'
import { browser as logger } from '@services/logger'

interface UserProviderProps {
  children: React.ReactNode
}

interface State {
  isLoading?: boolean
  isProcessing?: boolean
  user?: User | null
}

interface Actions {
  getMe: () => void
  login: (data: { username: string; password: string }) => void
  logout: () => void
}

type TUserContext<T> = [T, React.Dispatch<React.SetStateAction<T>>]

const UserContext = React.createContext<TUserContext<State>>([null!, null!])

const INITIAL_STATE: State = {
  isLoading: true,
  isProcessing: false
}

const useUserContext = () => {
  const context = useContext(UserContext)

  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider')
  }

  return context
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [state, setState] = useState(INITIAL_STATE)

  return <UserContext.Provider value={[state, setState]}>{children}</UserContext.Provider>
}

const useUser = (): [State, Actions] => {
  const [state, setState] = useUserContext()

  const updateState = (nextState: State) => setState({ ...state, ...nextState })

  const getMe = useCallback(async () => {
    try {
      const user = await api.getMe()
      updateState({ user, isLoading: false })
    } catch {
      updateState({ isLoading: false })
    }
  }, [])

  const login = useCallback(async (data) => {
    try {
      updateState({ isProcessing: true })
      await api.login(data)
      const user = await api.getMe()

      updateState({ user, isProcessing: false })

      Router.push('/admin/photos')
    } catch (err) {
      if (err instanceof api.getErrorConstructor()) {
        const status = err.response.status

        updateState({ isProcessing: false })

        if ([401, 422].includes(status)) {
          alert('Bad username/password. Please retry')
        }
      }
    }
  }, [])

  const logout = useCallback(async () => {
    try {
      await api.logout()
      updateState({ user: null })
    } catch (err) {
      logger.error(err)
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
