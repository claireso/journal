'use client'

import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'

interface Message {
  key?: string
  status: 'default' | 'success' | 'error' | 'info'
  message: string
}

interface Actions {
  displaySuccessMessage: (data: Omit<Message, 'status'>) => void
  displayErrorMessage: (data: Omit<Message, 'status'>) => void
  closeMessage: (index: number) => void
  closeAllMessages: () => void
}

const INITIAL_STATE: Message[] = []

type TMessagesContext<T> = [T, React.Dispatch<React.SetStateAction<T>>]

const MessagesContext = React.createContext<TMessagesContext<Message[]>>([null!, null!])

interface MessagesProviderProps {
  children: React.ReactNode
}

export const MessagesProvider = ({ children }: MessagesProviderProps) => {
  const [state, setState] = useState(INITIAL_STATE)

  return <MessagesContext.Provider value={[state, setState]}>{children}</MessagesContext.Provider>
}

const useMessagesContext = () => {
  const context = useContext(MessagesContext)

  if (context === undefined) {
    throw new Error('useMessagesContext must be used within a MessagesProvider')
  }

  return context
}

MessagesProvider.propTypes = {
  children: PropTypes.any
}

const useMessages = (): [Message[], Actions] => {
  const [messages, setMessages] = useMessagesContext()

  const closeMessage = (index: number) => {
    setMessages([...messages.slice(0, index), ...messages.slice(index + 1)])
  }

  const closeAllMessages = () => setMessages([])

  const displayMessage = (status: Message['status']) => (message: Omit<Message, 'status'>) => {
    let index = messages.length

    if (message.key) {
      const newIndex = messages.findIndex((_message: Message) => _message.key === message.key)

      if (newIndex > -1) {
        index = newIndex
      }
    }

    setMessages([
      ...messages.slice(0, index),
      {
        status,
        ...message
      },
      ...messages.slice(index + 1)
    ])
  }

  const displaySuccessMessage = displayMessage('success')
  const displayErrorMessage = displayMessage('error')

  return [
    messages,
    {
      displaySuccessMessage,
      displayErrorMessage,
      closeMessage,
      closeAllMessages
    }
  ]
}

export default useMessages
