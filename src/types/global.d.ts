declare type Query = {
  page?: string
  action?: Action
  id?: number
}

declare type NavigateOptions = {
  scroll?: boolean
}

declare type NextPageProps<T> = {
  params: Promise<T>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

declare type FormActionState<T> = { status: 'idle' } | { status: 'success'; item: T } | { status: 'error' }
