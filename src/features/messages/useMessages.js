import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'

const MessagesContext = React.createContext()

const useMessagesContext = () => {
  const context = useContext(MessagesContext)

  if (context === undefined) {
    throw new Error('useMessagesContext must be used within a MessagesProvider')
  }

  return context
}

export const MessagesProvider = ({ children }) => {
  const [state, setState] = useState([])

  return <MessagesContext.Provider value={[state, setState]}>{children}</MessagesContext.Provider>
}

MessagesProvider.propTypes = {
  children: PropTypes.any
}

const useMessages = () => {
  const [messages, setMessages] = useMessagesContext()

  const closeMessage = (index) => {
    setMessages([...messages.slice(0, index), ...messages.slice(index + 1)])
  }

  const closeAllMessages = () => setMessages([])

  const displayMessage = (status) => (message) => {
    let index = messages.length

    if (message.key) {
      const newIndex = messages.findIndex((_message) => _message.key === message.key)

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
