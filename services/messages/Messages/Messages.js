import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

import emitter from '@services/emitter'

import FlashGroup from '@components/FlashGroup'

import { useMessagesReducer } from '../reducer'

import useUpdateEffect from './hooks/useUpdateEffect'

const Messages = () => {
  const [messages, { displayMessage, closeAllMessages, closeMessage }] =
    useMessagesReducer()
  const router = useRouter()

  useEffect(() => {
    emitter.on('feat/messages/add', displayMessage)

    return () => emitter.off('feat/messages/add', displayMessage)
  }, [displayMessage])

  useUpdateEffect(() => {
    messages?.length && closeAllMessages()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname, closeAllMessages])

  return <FlashGroup messages={messages} onClose={closeMessage} />
}

export default Messages
