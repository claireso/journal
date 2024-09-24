import { z } from 'zod'

export const MediaRequestSchema = z.object({
  file: z.instanceof(File).refine((file) => ['image/jpeg', 'image/jpg'].includes(file.type), {
    message: 'Only image/jpeg and image/jpg are allowed'
  })
})

export type MediaRequest = z.infer<typeof MediaRequestSchema>
