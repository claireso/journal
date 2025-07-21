import { z } from 'zod'

export const MediaInsertDtoSchema = z.object({
  file: z.instanceof(File).refine((file) => ['image/jpeg', 'image/jpg'].includes(file.type), {
    error: 'Only image/jpeg and image/jpg are allowed'
  })
})

export type MediaInsertDto = z.infer<typeof MediaInsertDtoSchema>
