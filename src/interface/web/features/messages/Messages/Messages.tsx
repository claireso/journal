import React, { useEffect } from 'react'
import { usePathname } from 'next/navigation'

import FlashGroup from '@web/components/FlashGroup'

import useMessages from '@web/features/messages/useMessages'

const Messages = () => {
  const pathname = usePathname()
  const [messages, { closeMessage, closeAllMessages }] = useMessages()

  useEffect(() => {
    messages?.length && closeAllMessages()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return <FlashGroup messages={messages} onClose={closeMessage} />
}

export default Messages
