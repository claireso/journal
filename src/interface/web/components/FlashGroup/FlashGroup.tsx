import React from 'react'

import Flash from '../Flash'

export interface Message {
  status: 'default' | 'success' | 'error' | 'info'
  message: string
}

interface FlashGroupProps {
  messages: Message[]
  onClose: (index: number) => void
}

const FlashGroup = ({ messages, ...props }: FlashGroupProps) => {
  if (!messages.length) return null

  return (
    <div>
      {messages.map((message, index) => (
        <Flash status={message.status} onClose={props.onClose} key={index} index={index} withBorder={index > 0}>
          {message.message}
        </Flash>
      ))}
    </div>
  )
}

export default FlashGroup
