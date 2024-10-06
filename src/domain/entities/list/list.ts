import { z, ZodType } from 'zod'
import { PagerSchema } from '../pager'

export const ListSchema = <T extends ZodType<any>>(itemsSchema: T) =>
  z.object({
    items: itemsSchema,
    pager: PagerSchema
  })

export type List<T extends ZodType<any>> = z.infer<ReturnType<typeof ListSchema<T>>>
