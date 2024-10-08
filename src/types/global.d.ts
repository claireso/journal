declare type Query = {
  page?: string
  action?: Action
  id?: number
}

declare type NavigateOptions = {
  scroll?: boolean
}

declare type NextPageProps<T> = {
  params: T
  searchParams: { [key: string]: string | string[] | undefined }
}
