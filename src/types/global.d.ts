interface BaseEntity {
  id: number
  created_at: string
  updated_at: string
}

interface BaseList {
  pager: {
    count: number
  }
}

declare interface Pager {
  count: number
  offset: number
  limit: number
  totalPages: number
  first?: number
  prev?: number
  next?: number
  last?: number
}

declare interface Photo extends BaseEntity {
  title?: string
  description?: string
  name: string
  position: 'left' | 'center' | 'right'
  portrait: boolean
  square: boolean
  color?: string
  source: string
}

declare interface Photos extends BaseList {
  items: Photo[]
}

declare interface Subscription extends BaseEntity {
  subscription: {
    endpoint: string
    expirationTime: number
    keys: {
      p256dh: string
      auth: string
    }
  }
}

declare interface Subscriptions extends BaseList {
  items: Subscription[]
}

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
