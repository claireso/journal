import { useMutation } from '@tanstack/react-query'

import * as api from '@web/services/api'
import type { Media } from '@domain/entities'

/**
 * Create photo and update cache
 * @returns object
 */
export const useCreateMedia = () => {
  return useMutation({
    mutationFn: (data: FormData): Promise<Media> => api.createMedia(data)
  })
}
