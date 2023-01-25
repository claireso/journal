import React, { useState, useContext, useCallback } from 'react'

import * as api from '@services/api'
import logger from '@services/logger'

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
  reset: () => void
}

type TUserContext<T> = [T, React.Dispatch<React.SetStateAction<T>>]

const UserContext = React.createContext<TUserContext<State>>([null!, null!])

const INITIAL_STATE: State = {
  isLoading: true,
  isProcessing: false,
  user: null
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

  const login = useCallback(async (data: { username: string; password: string }) => {
    try {
      updateState({ isProcessing: true })
      await api.login(data)
    } catch (err) {
      logger.error(err)
      throw err
    } finally {
      updateState({ isProcessing: false })
    }
  }, [])

  const reset = useCallback(() => updateState(INITIAL_STATE), [])
  const logout = useCallback(async () => {
    try {
      await api.logout()
      reset()
    } catch (err) {
      logger.error(err)
    }
  }, [])

  return [
    state,
    {
      getMe,
      login,
      logout,
      reset
    }
  ]
}

export default useUser
