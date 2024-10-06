import { z } from 'zod'

export const PagerSchema = z.object({
  count: z.number(),
  offset: z.number(),
  limit: z.number(),
  totalPages: z.number(),
  first: z.number(),
  prev: z.number(),
  next: z.number(),
  last: z.number()
})

export type Pager = z.infer<typeof PagerSchema>
