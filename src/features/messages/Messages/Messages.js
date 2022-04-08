import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

import FlashGroup from '@components/FlashGroup'

import useMessages from '@features/messages/useMessages'

const Messages = () => {
  const router = useRouter()
  const [messages, { closeMessage, closeAllMessages }] = useMessages()

  useEffect(() => {
    messages?.length && closeAllMessages()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname])

  return <FlashGroup messages={messages} onClose={closeMessage} />
}

export default Messages
