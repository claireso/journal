'use client'

import { useCallback, useState } from 'react'
import { deletePhotoAction } from '@infrastructure/actions'
import useMessages from '@web/features/messages/useMessages'

/**
 * Delete photo
 */
export const useDeletePhoto = () => {
  const [processing, setProcessing] = useState(false)
  const [, { displayErrorMessage, displaySuccessMessage }] = useMessages()

  const action = useCallback(
    async (id: string) => {
      try {
        if (processing) {
          return
        }
        setProcessing(true)
        await deletePhotoAction(id)
        displaySuccessMessage({
          key: 'CRUD_PHOTO',
          message: 'Your photo has been deleted successfully'
        })
      } catch {
        displayErrorMessage({
          key: 'CRUD_PHOTO',
          message: 'An error has occured during the deletion. Please retry'
        })
      }
    },
    [processing, displayErrorMessage, displaySuccessMessage]
  )

  return [{ processing }, action] as const
}
