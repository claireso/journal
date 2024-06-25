declare interface User {
  cid: string
}

declare type Query = {
  page?: string
  action?: Action
  id?: number
}

declare type NavigateOptions = {
  scroll?: boolean
}
