import React from 'react'
import { useRouter } from 'next/router'

import FlashGroup from '@components/FlashGroup'

import useMessages from '@features/messages/useMessages'

import useUpdateEffect from '@hooks/useUpdateEffect'

const Messages = () => {
  const router = useRouter()
  const [messages, { closeMessage, closeAllMessages }] = useMessages()

  useUpdateEffect(() => {
    messages?.length && closeAllMessages()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname])

  return <FlashGroup messages={messages} onClose={closeMessage} />
}

export default Messages
