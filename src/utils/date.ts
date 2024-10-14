import { format, parseISO } from 'date-fns'

export const formatDate = (dateString: unknown) => {
  return format(parseISO(dateString as string), 'yyyy-MM-dd')
}

export const formatDateTime = (dateString: unknown) => {
  return format(parseISO(dateString as string), 'yyyy-MM-dd HH:mm:ss')
}
