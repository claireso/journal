import { useCallback, useState } from 'react'

import { type MediaDto, type LegacyMediaDto } from '@dto'
import { createMedia as createMediaAction } from '@application/usecases'

export const useCreateMedia = (initialMedia?: MediaDto | LegacyMediaDto) => {
  const [media, setMedia] = useState(initialMedia)
  const [error, setError] = useState<string | null>(null)
  const [processing, setProcessing] = useState(false)

  const createMedia = useCallback(async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)

    setError(null)
    setProcessing(true)

    try {
      const newMedia = await createMediaAction(formData)
      setMedia(newMedia)
    } catch {
      setError('An error has occured during the upload. Please retry')
    } finally {
      setProcessing(false)
    }
  }, [])

  return [{ media, processing, error }, createMedia] as const
}
