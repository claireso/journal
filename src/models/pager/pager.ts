import { z } from 'zod'

export const PagerSchema = z.object({
  count: z.number(),
  offset: z.number().optional(),
  limit: z.number().optional(),
  totalPages: z.number().optional(),
  first: z.number().optional(),
  prev: z.number().optional(),
  next: z.number().optional(),
  last: z.number().optional()
})

export type Pager = z.infer<typeof PagerSchema>
