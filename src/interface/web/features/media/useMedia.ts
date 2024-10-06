import { useMutation } from '@tanstack/react-query'

import * as api from '@web/services/api'
import type { MediaDto } from '@dto'

/**
 * Create photo and update cache
 * @returns object
 */
export const useCreateMedia = () => {
  return useMutation({
    mutationFn: (data: FormData): Promise<MediaDto> => api.createMedia(data)
  })
}
