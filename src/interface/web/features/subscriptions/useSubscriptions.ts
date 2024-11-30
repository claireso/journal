'use client'

import { useCallback, useState } from 'react'
import { deleteSubscription } from '@application/usecases'
import useMessages from '@web/features/messages/useMessages'

/**
 * Delete subscription and update cache
 * @returns object
 */
export const useDeleteSubscription = () => {
  const [processing, setProcessing] = useState(false)
  const [, { displayErrorMessage, displaySuccessMessage }] = useMessages()

  const action = useCallback(
    async (id: string) => {
      try {
        if (processing) {
          return
        }
        setProcessing(true)
        await deleteSubscription(id)
        displaySuccessMessage({
          key: 'CRUD_SUBSCRIPTION',
          message: 'Your subscription has been deleted successfully'
        })
      } catch {
        displayErrorMessage({
          key: 'CRUD_SUBSCRIPTION',
          message: 'An error has occured during the deletion. Please retry'
        })
      }
    },
    [processing, displayErrorMessage, displaySuccessMessage]
  )

  return [{ processing }, action] as const
}
